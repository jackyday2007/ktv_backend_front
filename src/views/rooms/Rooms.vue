<template>
    <div>
        <h3>所有包廂</h3>
        <div class="input-group mb-3">
            <button @click="openModal('insert')" type="button" class="btn btn-primary">新增包廂</button>
            
            <RoomsModal ref="roomRef" :is-show-insert-button="isShowInsertButton" v-model="room" @insert="callCreate" @update="callModify"></RoomsModal>
            
            <span class="input-group-text">包廂尺寸</span>
            <select v-model="searchSize" @change="findBySize(searchSize)" class="form-control">
                <option value="">所有包廂</option>
                <option value="小包廂">小包廂</option>
                <option value="中包廂">中包廂</option>
                <option value="大包廂">大包廂</option>
            </select>

            <span class="input-group-text">包廂狀態</span>
            <select v-model="searchStatus" @change="findByStatus(searchStatus)" class="form-control">
                <option value="">所有狀態</option>
                <option value="使用中">使用中</option>
                <option value="可使用">可使用</option>
                <option value="維護中">維護中</option>
            </select>

            <RoomUploadPhoto></RoomUploadPhoto>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>包廂號碼</th>
                    <th>包廂尺寸</th>
                    <th>包廂金額</th>
                    <th>包廂狀態</th>
                    <th>修改</th>
                </tr>
            </thead>
            <tbody>
                <RoomList v-for="item in rooms" :key="item.roomId" :room="item" 
                    @dblclick="openModal('update', item.roomId)"
                    @room-update="openModal('update', item.roomId)"></RoomList>
            </tbody>
        </table>

        <div class="pagination-container" v-show="total > 0">
            <Paginate :first-last-button="true"
                first-button-text="&lt;&lt;"
                last-button-text="&gt;&gt;"
                prev-text="&lt;"
                next-text="&gt;"
                :page-count="pages"
                :initial-page="current"
                v-model="current"
                :click-handler="callAll">
            </Paginate>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axiosapi from '@/plugins/axios';
import Swal from 'sweetalert2';
import Paginate from 'vuejs-paginate-next';
import RoomList from '@/components/rooms/RoomList.vue';
import RoomsModal from '@/components/rooms/RoomsModal.vue';
import RoomUploadPhoto from '@/components/rooms/RoomUploadPhoto.vue';

const rooms = ref([]);
const room = ref({});
const isShowInsertButton = ref(false);
const roomRef = ref(null);
const searchStatus = ref("");
const searchSize = ref("");

// 分頁 Start
const total = ref(0);   // 總資料筆數
const pages = ref(0);   // 總共頁數
const current = ref(1); // 目前頁碼
const rows = ref(10);   // 每頁顯示數量
const start = ref(0);   // 起始資料位置
// 分頁 End

// 監聽搜尋條件變更
watch([searchStatus, searchSize], () => {
    current.value = 1;  // 重設頁碼為第一頁
    callAll(current.value);
});

onMounted(() => {
    callAll();
});

// 開啟彈窗
function openModal(action, roomId) {
    if (action === 'insert') {
        isShowInsertButton.value = true;
        room.value = {};
    } else if (action === 'update') {
        isShowInsertButton.value = false;
        callFindById(roomId);
    }
    roomRef.value.showModal();
}

// 呼叫 API 取得資料並處理分頁
function callAll(page = 1) {
    start.value = (page - 1) * rows.value;
    current.value = page;

    let request = {
        start: start.value,
        max: rows.value,
        dir: true,
        order: "room",
    };

    if (searchStatus.value) {
        request.status = searchStatus.value;
    }

    if (searchSize.value) {
        request.size = searchSize.value;
    }

    axiosapi.post("/ktv-app/rooms/findAll", request).then(response => {
        rooms.value = response.data.list;
        total.value = response.data.count;
        pages.value = Math.ceil(total.value / rows.value);
        Swal.close();
    }).catch(error => {
        console.log('error=', error);
        Swal.fire({
            icon: 'error',
            text: '查詢失敗: ' + error.message,
        });
    });
}

// 用 roomId 搜尋
function callFindById(roomId) {
    axiosapi.get(`/ktv-app/rooms/findByRoomId/${roomId}`).then(response => {
        room.value = response.data.list[0];
        roomRef.value.showModal();
    }).catch(error => {
        Swal.fire({
            icon: 'error',
            text: '查詢失敗: ' + error.message,
        });
    });
}

// 新增包廂
function callCreate() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    // 處理空值
    for (let key in room.value) {
        if (room.value[key] === "") {
            room.value[key] = null;
        }
    }
    
    axiosapi.post("/ktv-app/rooms/create", room.value).then(response => {
        if (response.data.success) {
            Swal.fire({
                icon: "success",
                text: response.data.message,
            }).then(() => {
                roomRef.value.hideModal();
                callAll(current.value);
            });
        } else {
            Swal.fire({
                icon: "warning",
                text: response.data.message,
            });
        }
    }).catch(error => {
        Swal.fire({
            icon: "error",
            text: "新增錯誤：" + error.message,
        });
    });
}

// 修改包廂
function callModify() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    // 處理空值
    for (let key in room.value) {
        if (room.value[key] === "") {
            room.value[key] = null;
        }
    }
    
    axiosapi.put(`/ktv-app/rooms/modify/${room.value.roomId}`, room.value).then(response => {
        if (response.data.success) {
            Swal.fire({
                icon: "success",
                text: response.data.message,
            }).then(() => {
                roomRef.value.hideModal();
                callAll(current.value);
            });
        } else {
            Swal.fire({
                icon: "warning",
                text: response.data.message,
            });
        }
    }).catch(error => {
        Swal.fire({
            icon: "error",
            text: "修改錯誤：" + error.message,
        });
    });
}

// 用 status 搜尋包廂
function findByStatus(status) {
    searchStatus.value = status;
    callAll(current.value); // 重新載入資料
}

// 用 size 搜尋包廂
function findBySize(size) {
    searchSize.value = size;
    callAll(current.value); // 重新載入資料
}
</script>

<style scoped>
.input-group {
    margin-bottom: 20px;
}

.input-group .form-control {
    margin-left: 10px;
}

.table {
    margin-top: 20px;
    width: 100%;
}

.table th, .table td {
    text-align: center;
    vertical-align: middle;
}

.table th {
    background-color: #f8f9fa;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: #f2f2f2;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>
