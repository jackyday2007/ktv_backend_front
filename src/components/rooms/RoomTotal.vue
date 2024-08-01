<template>
  <div class="container">
    <div class="table-container">
      <!-- 包廂數量表格 -->
      <h3 class="heading">包廂狀態</h3>
      <table class="table">
        <thead>
          <tr>
            <th>尺寸/狀態</th>
            <th>使用中</th>
            <th>開放中</th>
            <th>維護中</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>大包廂</td>
            <td class="animated-cell">{{ countRooms('大', '使用中') }}</td>
            <td class="animated-cell">{{ countRooms('大', '開放中') }}</td>
            <td class="animated-cell">{{ countRooms('大', '維護中') }}</td>
          </tr>
          <tr>
            <td>中包廂</td>
            <td class="animated-cell">{{ countRooms('中', '使用中') }}</td>
            <td class="animated-cell">{{ countRooms('中', '開放中') }}</td>
            <td class="animated-cell">{{ countRooms('中', '維護中') }}</td>
          </tr>
          <tr>
            <td>小包廂</td>
            <td class="animated-cell">{{ countRooms('小', '使用中') }}</td>
            <td class="animated-cell">{{ countRooms('小', '開放中') }}</td>
            <td class="animated-cell">{{ countRooms('小', '維護中') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosapi from '@/plugins/axios';

// 存儲包廂數據
const rooms = ref([]);

// 取得所有包廂數據
onMounted(() => {
  axiosapi.post("/ktv-app/ktvbackend/rooms/findAllNoPage", {})
    .then(response => {
      rooms.value = response.data.list; // 設置為所有資料
    })
    .catch(error => {
      console.log('error=', error);
    });
});

// 計算包廂數量
function countRooms(size, status) {
  return rooms.value.filter(room => room.size === size && room.status === status).length;
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.table-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.heading {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  font-weight: 600;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 14px;
  text-align: center;
  border: 1px solid #e1e5eb;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.table th {
  background-color: #007bff;
  color: #ffffff;
  font-weight: 600;
}

.table tbody tr:nth-child(even) {
  background-color: #ffffff;
}

.table tbody tr:hover {
  background-color: #e2e6ea;
  cursor: pointer;
}

.animated-cell {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.animated-cell:hover {
  background-color: #d6e0e9;
  transform: scale(1.05);
}
</style>
