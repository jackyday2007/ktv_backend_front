<template>
  <h3 class="heading">包廂問題管理</h3>
  <div class="input-group mb-3">
    <button type="button" class="btn btn-primary" @click="openModal('insert')">新增問題</button>
    <span class="input-group-text" id="inputGroup-sizing-default">訂單編號</span>
    <input v-model="searchProblemId" @input="search" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    <span class="input-group-text" id="inputGroup-sizing-default">包廂號碼</span>
    <input v-model="searchRoomId" @input="searchByRoomId" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    <span class="input-group-text" id="inputGroup-sizing-default">包廂狀態</span>
    <select v-model="searchStatus" @change="search" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
      <option value="">所有狀態</option>
      <option>處理中</option>
      <option>結案</option>
    </select>
  </div>

  <ProblemModal ref="problemRef" :is-show-insert-button="isShowInsertButton" v-model="problem" @insert="callCreate" @update="callModify"></ProblemModal>

  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>編號</th>
        <th>事件問題</th>
        <th>包廂號碼</th>
        <th>說明內容</th>
        <th @click="sortBy('eventDate')">發生時間<span v-if="sortDirection === 'asc'" class="sort-arrow">🔺</span>
          <span v-else class="sort-arrow">🔻</span></th>
        <th>結案時間</th>
        <th>處理狀態</th>
        <th>功能</th>
      </tr>
    </thead>
    <tbody>
      <ProblemList
        v-for="item in problems"
        :key="item.problemId"
        :problem="item"
        @problem-update="openModal('update', item.problemId)"
      ></ProblemList>
    </tbody>
  </table>

  <div style="display: flex; justify-content: center;">
    <div v-show="total != 0">
      <Paginate
        :first-last-button="true"
        first-button-text="&lt;&lt;"
        last-button-text="&gt;&gt;"
        prev-text="&lt;"
        next-text="&gt;"
        :page-count="pages"
        :initial-page="current"
        v-model="current"
        :click-handler="callFind"
      ></Paginate>
    </div>
  </div>
</template>

<script setup>
import ProblemList from '@/components/problems/problemList.vue';
import ProblemModal from '@/components/problems/ProblemModal.vue';
import { ref, onMounted } from 'vue';
import axiosapi from '@/plugins/axios';
import Swal from 'sweetalert2';
import Paginate from 'vuejs-paginate-next';

const total = ref(0);   // 總資料筆數
const pages = ref(0);   // 總共頁數
const current = ref(1); // 目前頁碼
const rows = ref(10);   // 最多抓幾筆資料
const start = ref(0);   // 從哪裡開始抓資料
const lastPageRows = ref(0);

const problems = ref([]);
const problem = ref({});
const problemRef = ref(null);
const isShowInsertButton = ref(false);
const searchProblemId = ref("");
const searchRoomId = ref("");
const searchStatus = ref("");
const sortField = ref("eventDate"); // 默認排序欄位
const sortDirection = ref("asc"); // 默認排序方向

// =========== 開啟時載入 ===========

onMounted(() => {
  if (!sessionStorage.getItem("user")) {
    router.push("/secure/login");
  } else {
    callFind();
  }
});

function openModal(action, problemId) {
  if (action === 'insert') {
    isShowInsertButton.value = true;
    problem.value = {};
  } else if (action === 'update') {
    isShowInsertButton.value = false;
    callFindById(problemId);
  }
  problemRef.value.showModal();
}

function callFindById(problemId) {
  axiosapi.get(`/ktv-app/ktvbackend/problems/findByProblemId/${problemId}`).then(response => {
    problem.value = response.data.list[0];
    problemRef.value.showModal();
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      text: '查詢失敗: ' + error.message,
    });
  });
}

function searchByRoomId() {
  if (searchRoomId.value.trim() === "") {
    callFind(); // 如果包廂號碼為空，則查詢所有資料
  } else {
    axiosapi.get(`/ktv-app/ktvbackend/problems/findProblemsByRoom/${searchRoomId.value}`).then(response => {
      problems.value = response.data.list;
      total.value = response.data.count;
      pages.value = Math.ceil(total.value / rows.value);
      lastPageRows.value = total.value % rows.value;

      setTimeout(() => {
        Swal.close();
      }, 200);
    }).catch(error => {
      Swal.fire({
        text: "查詢失敗: " + error.message,
        icon: "error",
      });
    });
  }
}

function callModify() {
  Swal.fire({
    text: "執行中......",
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  for (let key in problem.value) {
    if (problem.value[key] === "") {
      problem.value[key] = null;
    }
  }

  axiosapi.put(`/ktv-app/ktvbackend/problems/modify/${problem.value.problemId}`, problem.value)
    .then(response => {
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
        }).then(() => {
          problemRef.value.hideModal();
          callFind(current.value);
        });
      } else {
        Swal.fire({
          icon: "warning",
          text: response.data.message,
        });
      }
    })
    .catch(error => {
      // 提取伺服器返回的錯誤信息
      let errorMessage = error.response && error.response.data ? error.response.data.message : error.message;

      Swal.fire({
        icon: "error",
        text: "修改錯誤：" + errorMessage,
      });
    });
}


function callCreate() {
  Swal.fire({
    text: "執行中......",
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  for (let key in problem.value) {
    if (problem.value[key] === "") {
      problem.value[key] = null;
    }
  }

  axiosapi.post("/ktv-app/ktvbackend/problems/create", problem.value).then(response => {
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        text: response.data.message,
      }).then(() => {
        problemRef.value.hideModal();
        callFind(current.value);
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

function search() {
  callFind();
}

function callFind(page) {
  if (page) {
    start.value = (page - 1) * rows.value;
    current.value = page;
  } else {
    start.value = 0;
    current.value = 1;
  }

  let request = {
    "start": start.value,
    "max": rows.value,
    "problemId": searchProblemId.value || null,
    "roomId": searchRoomId.value || null,
    "status": searchStatus.value || null,
    "sortField": sortField.value,
    "sortDirection": sortDirection.value
  };

  axiosapi.post('/ktv-app/ktvbackend/problems/findAll', request).then(response => {
    problems.value = response.data.list;
    total.value = response.data.count;
    pages.value = Math.ceil(total.value / rows.value);
    lastPageRows.value = total.value % rows.value;

    setTimeout(() => {
      Swal.close();
    }, 500);
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      text: '查詢失敗: ' + error.message,
    });
  });
}

function sortBy(field) {
  // 切換排序方向
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc"; // 默認為升序
  }
  callFind(); // 重新加載數據
}
</script>

<style>
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
