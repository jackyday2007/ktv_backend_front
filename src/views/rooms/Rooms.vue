<template>
    <div>
        <button @click="openModal('insert')" type="button" class="btn btn-outline-info">新增包廂</button>
    </div>
    <RoomsModal ref="roomRef":is-show-insert-button="isShowInsertButton" v-model="room" @insert="callCreate" @update="callModify"></RoomsModal>
    <h2>所有包廂</h2>
    <thead>
        <tr>
            <th>包廂號碼</th>
            <th>包廂規格</th>
            <th>包廂金額</th>
            <th>包廂狀態</th>
            <!-- <th>包廂照片</th> -->
            <th>修改</th>
        </tr>
    </thead>
        <RoomList v-for="item in rooms"
        :key="item.roomId"
        :room="item"
        @dblclick="openModal('update', item.roomId)"
        @room-update="openModal('update', item.roomId)"></RoomList>

        <div style="display:flex; justify-content: center;" >
        <div  v-show="total!=0">
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
    </div>
</template>
    
<script setup >
    import RoomList from '@/components/room/RoomList.vue';
    import RoomsModal from '@/components/room/RoomsModal.vue'
    import axiosapi from '@/plugins/axios';
    import { ref , onMounted } from 'vue';
    import Swal from 'sweetalert2';
    import Paginate from 'vuejs-paginate-next';

    const rooms = ref([]);
    const room = ref({});
    const findRoom = ref("");
    const isShowInsertButton = ref(false);
    const roomRef = ref(null);

    //分頁 Start
    const total = ref(0);   //總資料筆數
    const pages = ref(0);   //總共頁數
    const current = ref(1); //目前頁碼
    const rows = ref(10);    //最多抓幾筆資料
    const start = ref(0);   //從哪裡開始抓資料
    const lastPageRows = ref(0); 
    //分頁 End

    onMounted(
        function(){
            callAll();
        }
    )

    // 開啟彈窗
    function openModal(action , roomId){
        if(action==='insert'){
            isShowInsertButton.value = true;
            room.value = {};
        }else if(action==='update'){
            isShowInsertButton.value = false;
            callFindById(roomId);
        }
        roomRef.value.showModal();
    }

    // 找全部及分頁
    function callAll(page){

        if(page){
            start.value = ( page -1 ) * rows.value;
            current.value = page;
            }else{
                start.value = 0;
                current.value = 1;
                }
            if(findRoom.value==""){
                findRoom.value = null;
        }   
        let request = {
        "start":start.value,
        "max":rows.value,
        "dir":true,
        "order":"room",
        }
        axiosapi.post("/ktv-app/rooms/findAll" , request).then(function(response){
            rooms.value = response.data.list;
            total.value = response.data.count;
            pages.value = Math.ceil(total.value / rows.value);
            lastPageRows.value = total.value % rows.value;
            setTimeout(function() {
                Swal.close();
            }, 500);
        }).catch(function(error){
            console.log('error=', error);
            Swal.fire({
                icon: 'error',
                text: '查詢失敗: ' + error.message,
            });
        });
    }

    // 用roomId搜尋
    function callFindById(roomId){
        axiosapi.get(`/ktv-app/rooms/findByRoomId/${roomId}`).then(function(response){
            room.value = response.data.list[0];
            roomRef.value.showModal();
        }).catch(function(error){
            Swal.fire({
            icon: 'error',
            text: '查詢失敗: ' + error.message,
            });
        });
    }

    // 新增包廂
    function callCreate(){
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
        axiosapi.post("/ktv-app/rooms/create" , room.value).then(function(response){
            if(response.data.success)  {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function(result) {
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
                text: "新增錯誤："+error.message,
            });
        });
    }

    // 修改包廂
    function callModify(){

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

        axiosapi.put(`/ktv-app/rooms/modify/${room.value.roomId}` , room.value).then(function(response){
            if(response.data.success)  {
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
                text: "修改錯誤："+error.message,
            });
        });
    }
</script>
    
<style>
    
</style>