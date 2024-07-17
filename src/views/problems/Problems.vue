<template>
  <h3>ProblemList</h3>
  <div class="col-4">
      <input type="text" placeholder="請輸入產品名稱" v-model="findName" @input="callFind(1)">
  </div>
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
      </tr>
    </thead>
    <tbody>
      <ProblemList
        v-for="item in problems"
        :key="item.problemId"
        :problem="item"
      ></ProblemList>
    </tbody>
  </table>
  
</template>

<script>
import { ref, onMounted } from 'vue';
import axiosapi from '@/plugins/axios';

import Swal from 'sweetalert2';
import ProblemList from '@/components/problems/ProblemList.vue';

    const findName = ref("");

   //分頁 Start
    const total = ref(0);   //總資料筆數
    const pages = ref(0);   //總共頁數
    const current = ref(0); //目前頁碼
    const rows = ref(4);    //最多抓幾筆資料
    const start = ref(0);   //從哪裡開始抓資料
    const lastPageRows = ref(0); 
    //分頁 End

    const problems = ref([]);
    const problem = ref({});

    onMounted (
        function() {
          callFind()
        }
    )

    function callFind(page){

      console.log("page" , page);

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
        // "start":start.value,
        // "max":rows.value,
        // "dir":false,
        // "order":"room",
        // "name":findName.value
    }

      axiosapi.post('/ktv-app/problems/findAll', request).then(function(response){
          console.log('response=', response);
          problems.value = response.data.list;
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
    };


</script>

<style>


</style>
