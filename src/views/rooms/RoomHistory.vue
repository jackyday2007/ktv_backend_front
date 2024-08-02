<template>
    <div>
        <h3 class="heading">包廂紀錄查詢</h3>
        <div class="input-group mb-3">
            <span class="input-group-text">選擇日期範圍</span>
            <input type="date" v-model="startDate" class="form-control">
            <input type="date" v-model="endDate" class="form-control">
            <button @click="findByTimeRange" type="button" class="btn btn-primary">查詢歷史紀錄</button>
        </div>

        <!-- 房間歷史紀錄表格 -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>訂單號碼</th>
                    <th>包廂號碼</th>
                    <th>包廂尺寸</th>
                    <th>日期</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>狀態</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedRooms" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.orderId }}</td>
                    <td>{{ item.roomId }}</td>
                    <td>{{ item.size }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.startTime }}</td>
                    <td>{{ item.endTime }}</td>
                    <td>{{ item.status }}</td>
                </tr>
                <tr v-if="paginatedRooms.length === 0">
                    <td colspan="8" class="text-center">沒有資料</td>
                </tr>
            </tbody>
        </table>

        <!-- 分頁控制 -->
        <nav v-if="totalPages > 1" aria-label="Page navigation" class="d-flex justify-content-center">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                    <a class="page-link" href="#" @click.prevent="changePage(0)">&lt;&lt;</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">&lt;</a>
                </li>
                <li v-for="page in totalPagesArray" :key="page" class="page-item" :class="{ active: currentPage === page - 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(page - 1)">
                        {{ page }}
                    </a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">&gt;</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(totalPages - 1)">&gt;&gt;</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import axiosapi from '@/plugins/axios';
import Swal from 'sweetalert2';
import router from '@/router/router';

const rooms = ref([]);
const startDate = ref("");
const endDate = ref("");
const currentPage = ref(0);
const pageSize = ref(8);

onBeforeMount (
        function() {
            if (!sessionStorage.getItem("user")) {
                router.push("/secure/login")
            }
        }
    )

const findByTimeRange = async () => {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    try {
        const response = await axiosapi.get('/ktv-app/ktvbackend/roomHistory/findByTimeRange', {
            params: {
                startDate: startDate.value,
                endDate: endDate.value
            }
        });

        // 排序資料（日期最新在最前面）
        rooms.value = response.data.list.sort((a, b) => new Date(b.date) - new Date(a.date));
        currentPage.value = 0; // Reset to the first page
        Swal.close();
    } catch (error) {
        console.log('error=', error);
        Swal.fire({
            icon: 'error',
            text: '查詢失敗: ' + error.message,
        });
    }
};

// 分頁計算屬性
const paginatedRooms = computed(() => {
    const start = currentPage.value * pageSize.value;
    const end = start + pageSize.value;
    return rooms.value.slice(start, end);
});

// 總頁數
const totalPages = computed(() => {
    return rooms.value.length > 0 ? Math.ceil(rooms.value.length / pageSize.value) : 0;
});

// 分頁數字陣列
const totalPagesArray = computed(() => {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

const changePage = (page) => {
    if (page >= 0 && page < totalPages.value) {
        currentPage.value = page;
    }
};
</script>

<style>
/* 將分頁控制置中 */
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

/* 標題樣式 */
.heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}
</style>
