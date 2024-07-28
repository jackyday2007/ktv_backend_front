<template>
    <h3>所有包廂</h3>
        <div class="input-group mb-3">
            <button @click="openModal('insert')" type="button" class="btn btn-primary">新增包廂</button>
            
        <RoomsModal ref="roomRef" :is-show-insert-button="isShowInsertButton" v-model="room" @insert="callCreate" @update="callModify"></RoomsModal>
        
        <span class="input-group-text" id="inputGroup-sizing-default">包廂尺寸</span>
        <select v-model="searchSize" @change="findBySize(searchSize)" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <option></option>
            <option>小包廂</option>
            <option>中包廂</option>
            <option>大包廂</option>
        </select>

        <span class="input-group-text" id="inputGroup-sizing-default">包廂狀態</span>
        <select v-model="searchStatus" @change="findByStatus(searchStatus)" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <option></option>
            <option>使用中</option>
            <option>可使用</option>
            <option>維護中</option>
        </select>
        <RoomUploadPhoto></RoomUploadPhoto>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>包廂號碼</th>
                    <th>包廂規格</th>
                    <th>包廂金額</th>
                    <th>包廂狀態</th>
                    <th>修改</th>
                </tr>
            </thead>
            <tbody>
                <RoomList v-for="item in rooms"
                    :key="item.roomId"
                    :room="item"
                    @dblclick="openModal('update', item.roomId)"
                    @room-update="openModal('update', item.roomId)"></RoomList>
            </tbody>
        </table>
        <div class="pagination-container" v-show="total != 0">
            <Paginate :first-last-button="true" 
                first-button-text="&lt;&lt;" 
                last-button-text="&gt;&gt;"
                prev-text="&lt;" next-text="&gt;"
                :page-count="pages"
                :initial-page="current"
                v-model="current"
                :click-handler="callAll">
            </Paginate>
        </div>
</template>


<script setup>
    import RoomList from '@/components/rooms/RoomList.vue';
    import RoomsModal from '@/components/rooms/RoomsModal.vue';
    import RoomUploadPhoto from '@/components/rooms/RoomUploadPhoto.vue';
    import axiosapi from '@/plugins/axios';
    import { ref, onMounted } from 'vue';
    import Swal from 'sweetalert2';
    import Paginate from 'vuejs-paginate-next';

    const rooms = ref([]);
    const room = ref({});
    const findRoom = ref("");
    const isShowInsertButton = ref(false);
    const roomRef = ref(null);
    const searchStatus = ref("");
    const searchSize = ref("");

    // 分頁 Start
    const total = ref(0);   // 總資料筆數
    const pages = ref(0);   // 總共頁數
    const current = ref(1); // 目前頁碼
    const rows = ref(10);   // 最多抓幾筆資料
    const start = ref(0);   // 從哪裡開始抓資料
    const lastPageRows = ref(0); 
    // 分頁 End

    onMounted(function() {
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

    // 找全部及分頁
    function callAll(page) {
        if (page) {
            start.value = (page - 1) * rows.value;
            current.value = page;
        } else {
            start.value = 0;
            current.value = 1;
        }
        if (findRoom.value == "") {
            findRoom.value = null;
        }
        let request = {
            "start": start.value,
            "max": rows.value,
            "dir": true,
            "order": "room",
        };
        axiosapi.post("/ktv-app/rooms/findAll", request).then(function(response) {
            rooms.value = response.data.list;
            total.value = response.data.count;
            pages.value = Math.ceil(total.value / rows.value);
            lastPageRows.value = total.value % rows.value;
            Swal.close();
        }).catch(function(error) {
            console.log('error=', error);
            Swal.fire({
                icon: 'error',
                text: '查詢失敗: ' + error.message,
            });
        });
    }

    // 用 roomId 搜尋
    function callFindById(roomId) {
        axiosapi.get(`/ktv-app/rooms/findByRoomId/${roomId}`).then(function(response) {
            room.value = response.data.list[0];
            roomRef.value.showModal();
        }).catch(function(error) {
            Swal.fire({
                icon: 'error',
                text: '查詢失敗: ' + error.message,
            });
        });
    }
    // 用 Status 搜尋
    function findByStatus(searchStatus){
        if(searchStatus == ""){
            callAll();
        }else{
            axiosapi.get(`/ktv-app/rooms/findByRoomStatus/${searchStatus}`).then(function(response){
                rooms.value = response.data.list;
  
            }).catch(function(error){
                setTimeout(function() {
                  Swal.close();
              }, 500); 
      }).catch(function(error){
          Swal.fire({
                  text: "失敗:"+ error.message ,
                  icon: "error" 
              });   
         });
       }
    }

    // 用 Size 搜尋
    function findBySize(searchSize){
        if(searchSize == ""){
            callAll();
        }else{
            axiosapi.get(`/ktv-app/rooms/findByRoomSize/${searchSize}`).then(function(response){
                rooms.value = response.data.list;
            }).catch(function(error){
                setTimeout(function() {
                  Swal.close();
              }, 500); 
      }).catch(function(error){
          Swal.fire({
                  text: "失敗:"+ error.message ,
                  icon: "error" 
              });   
         });
       }
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
        axiosapi.post("/ktv-app/rooms/create", room.value).then(function(response) {
            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function() {
                    roomRef.value.hideModal();
                    callAll(current.value);
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                });
            }
        }).catch(function(error) {
            console.log("error", error);
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

        axiosapi.put(`/ktv-app/rooms/modify/${room.value.roomId}`, room.value).then(function(response) {
            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function() {
                    roomRef.value.hideModal();
                    callAll(current.value);
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                });
            }
        }).catch(function(error) {
            Swal.fire({
                icon: "error",
                text: "修改錯誤：" + error.message,
            });
        });
    }
</script>

<style scoped>
.button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.button-group .btn {
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.btn-outline-dark {
    border-color: #343a40;
    color: #343a40;
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

