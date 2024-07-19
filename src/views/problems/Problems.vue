<template>
  <h3>包廂問題管理</h3>
  <div class="input-group mb-3">
        <button type="button" class="btn btn-primary" @click="openModal('insert')">新增問題</button>
        <span class="input-group-text" id="inputGroup-sizing-default">訂單編號</span>
        <input v-model="searchProblemId" @input="findById(searchProblemId)" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <span class="input-group-text" id="inputGroup-sizing-default">包廂號碼</span>
        <input v-model="searchRoomId" @input="findByRoom(searchRoomId)" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <span class="input-group-text" id="inputGroup-sizing-default">包廂狀態</span>
        <select v-model="searchStatus" @change="findByStatus(searchStatus)" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <option></option>
            <option>處理中</option>
            <option>結案</option>

        </select>
        
  </div>

  
     <ProblemModal ref="problemRef":is-show-insert-button="isShowInsertButton" v-model="problem" @insert="callCreate" @update="callModify"></ProblemModal>
     
     
  <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>問題編號</th>
          <th>事件案例</th>
          <th>包廂號碼</th>
          <th>說明內容</th>
          <th>發生時間</th>
          <th>處理時間</th>
          <th>包廂狀態</th>
          <th>修改</th>
        </tr>
      </thead>
      <tbody>
      <ProblemList v-for="item in problems"
        :key="item.problemId"
        :problem="item"
        @dblclick="openModal('update', item.problemId)"
        @problem-update="openModal('update', item.problemId)"></ProblemList>
    </tbody>
    
  </table>
  <div style="display:flex; justify-content: center;" >
        <div  v-show="total!=0">
            <Paginate :first-last-button="true" 
                first-button-text="&lt;&lt;" 
                last-button-text="&gt;&gt;"
                prev-text="&lt;" next-text="&gt;"
                :page-count="pages"
                :initial-page="current"
                v-model="current"
                :click-handler="callFind">
            </Paginate>
        </div>
    </div>
</template>
  
<script setup >
  import ProblemList from '@/components/problems/problemList.vue';
  import ProblemModal from '@/components/problems/ProblemModal.vue';
  import { ref, onMounted } from 'vue';
  import axiosapi from '@/plugins/axios';
  import Swal from 'sweetalert2';
  import Paginate from 'vuejs-paginate-next'; 
  

   //分頁 Start
    const total = ref(0);   //總資料筆數
    const pages = ref(0);   //總共頁數
    const current = ref(1); //目前頁碼
    const rows = ref(4);    //最多抓幾筆資料
    const start = ref(0);   //從哪裡開始抓資料
    const lastPageRows = ref(0); 
    //分頁 End

    const findName = ref("");
    const problems = ref([]);
    const problem = ref({});
    const problemRef = ref(null);
    const isShowInsertButton = ref(false);
    const searchProblemId = ref("");
    const searchRoomId = ref("");
    const searchStatus = ref("");


    onMounted (
        function() {
          callFind()
        }
    )

    function openModal(action , problemId){
        if(action==='insert'){
            isShowInsertButton.value = true;
            problem.value = {};
        }else if(action==='update'){
            isShowInsertButton.value = false;
            callFindById(problemId);
            // callModify();
        }
        problemRef.value.showModal();
    }

    function callFindById(problemId){
      axiosapi.get(`/ktv-app/problems/findByProblemId/${problemId}`).then(function(response){
        
        problem.value = response.data.list[0];
        problemRef.value.showModal();
        // callModify();
      }).catch(function(error){
            Swal.fire({
          icon: 'error',
          text: '查詢失敗: ' + error.message,
        });
      });
    }

    function callModify() {
      
        Swal.fire({
            text: "執行中......",
            allowOutsideClick: false,
            showConfirmButton: false,
        });

        // 處理空值
        for (let key in problem.value) {
          if (problem.value[key] === "") {
            problem.value[key] = null;
          }
        }

        console.log("problem----",problem.value);
        
        axiosapi.put(`/ktv-app/problems/modify/${problem.value.problemId}` , problem.value).then(function(response){
          console.log("response", response);
          if(response.data.success)  {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function() {
                  problemRef.value.hideModal();
                    callFind(current.value);
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
                text: "修改錯誤："+error.message,
            });
        });

    }

    function callFind(page){

    if(page){
      start.value = ( page -1 ) * rows.value;
      current.value = page;
    }else{
      start.value = 0;
      current.value = 1;
    }
    if(findName.value==""){
      findName.value = null;
    }

    let request = {
      "start":start.value,
      "max":rows.value,
      "dir":false,
      // "order":"room",
      // "name":findName.value
    }

    axiosapi.post('/ktv-app/problems/findAll', request).then(function(response){
        problems.value = response.data.list;
        total.value = response.data.count;
        console.log("total.value=",total.value);
        pages.value = Math.ceil(total.value / rows.value);
        console.log("pages.value=",pages.value);
        lastPageRows.value = total.value % rows.value;
        console.log("lastPageRows.value=",lastPageRows.value);

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

    function callCreate() {
      Swal.fire({
            text: "執行中......",
            allowOutsideClick: false,
            showConfirmButton: false,
        });
    // 處理空值
    for (let key in problem.value) {
        if (problem.value[key] === "") {
          problem.value[key] = null;
        }
      }

      axiosapi.post("/ktv-app/problems/create", problem.value)
        .then(function(response) {
          if(response.data.success)  {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function(result) {
                  problemRef.value.hideModal();
                    callFind(current.value);
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

    //搜尋Status狀態
    function findByStatus(searchStatus){
      if(searchStatus == ""){
        callFind();
      }else{
        axiosapi.get(`/ktv-app/problems/findProblemsByStatus/${searchStatus}`).then(function(response){
        console.log("searchRoomId==",searchStatus);
        problems.value = response.data.list;
        console.log("problems.value==",problems.value);
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

    //搜尋RoomId狀態
    function findByRoom(searchRoomId){
      if(searchRoomId == ""){
        callFind();
      }else{
        axiosapi.get(`/ktv-app/problems/findProblemsByRoom/${searchRoomId}`).then(function(response){
        problems.value = response.data.list;
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

    //搜尋ProblemId狀態
    function findById(searchProblemId){
      if(searchProblemId == ""){
        callFind();
      }else{
        axiosapi.get(`/ktv-app/problems/findByProblemId/${searchProblemId}`).then(function(response){
        problems.value = response.data.list;
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

</script>
  
<style>
  
</style>