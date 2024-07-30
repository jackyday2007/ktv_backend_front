<template>

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
                <th>包廂號碼</th>
                <th>包廂尺寸</th>
                <th>日期</th>
                <th>開始時間</th>
                <th>結束時間</th>
                <th>狀態</th>
                <!-- <th>創建時間</th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in rooms" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.roomId }}</td>
                <td>{{ item.size }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.endTime }}</td>
                <td>{{ item.status }}</td>
                <!-- <td>{{ item.createTime }}</td> -->
            </tr>
        </tbody>
    </table>
        
</template>
    
<script setup>
    import { ref } from 'vue';
    import axiosapi from '@/plugins/axios';
    import Swal from 'sweetalert2';

    const rooms = ref([]);
    const startDate = ref("");
    const endDate = ref("");

    // 查詢指定時間範圍的 RoomHistory
    function findByTimeRange() {
        Swal.fire({
            text: "執行中......",
            allowOutsideClick: false,
            showConfirmButton: false,
        });

        axiosapi.get('/ktv-app/roomHistory/findByTimeRange', {
            params: {
                startDate: startDate.value,
                endDate: endDate.value
            }
        }).then(response => {
            rooms.value = response.data.list;
            Swal.close();
        }).catch(error => {
            console.log('error=', error);
            Swal.fire({
                icon: 'error',
                text: '查詢失敗: ' + error.message,
            });
        });
    }
</script>
    
<style>
    
</style>