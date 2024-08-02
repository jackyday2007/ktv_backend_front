<template>
  <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">問題資訊</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3 row">
              <label for="eventCase" class="col-sm-4 col-form-label">事件問題</label>
              <div class="col-sm-8">
                <select id="eventCase" name="eventCase" :value="modelValue.eventCase" @input="doinput('eventCase', $event)" class="form-select">
                  <option value="">選擇事件問題</option>
                  <option>包廂環境問題</option>
                  <option>硬體設備問題</option>
                  <option>消費問題</option>
                  <option>其他問題</option>
                </select>
                <div v-if="warnings.eventCase" class="text-danger mt-2">需填入事件問題</div>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="roomId" class="col-sm-4 col-form-label">包廂號碼</label>
              <div class="col-sm-8">
                <input type="text" id="roomId" name="roomId" :value="modelValue.roomId" @input="doinput('roomId', $event)" class="form-control" placeholder="輸入包廂號碼" :disabled="!isShowInsertButton">
                <div v-if="warnings.roomId" class="text-danger mt-2">需填入包廂號碼</div>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="content" class="col-sm-4 col-form-label">說明內容</label>
              <div class="col-sm-8">
                <input type="text" id="content" name="content" :value="modelValue.content" @input="doinput('content', $event)" class="form-control" placeholder="輸入說明內容">
                <div v-if="warnings.content" class="text-danger mt-2">需填入說明內容</div>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventDate" class="col-sm-4 col-form-label">發生日期</label>
              <div class="col-sm-8">
                <input type="date" id="eventDate" name="eventDate" :value="modelValue.eventDate" @input="doinput('eventDate', $event)" class="form-control">
                <div v-if="warnings.eventDate" class="text-danger mt-2">需填入發生日期</div>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="closeDate" class="col-sm-4 col-form-label">結案日期</label>
              <div class="col-sm-8">
                <input type="date" id="closeDate" name="closeDate" :value="modelValue.closeDate" @input="doinput('closeDate', $event)" class="form-control" :disabled="modelValue.status !== '結案'">
                <div v-if="warnings.closeDate && modelValue.status === '結案'" class="text-danger mt-2">需填入結案日期</div>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="status" class="col-sm-4 col-form-label">處理狀態</label>
              <div class="col-sm-8">
                <select id="status" name="status" :value="modelValue.status" @input="doinput('status', $event)" class="form-select">
                  <option value="">選擇處理狀態</option>
                  <option>處理中</option>
                  <option>結案</option>
                </select>
                <div v-if="warnings.status" class="text-danger mt-2">需填入處理狀態</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary" v-show="isShowInsertButton" @click="handleSubmit('insert')">新增</button>
          <button type="button" class="btn btn-primary" v-show="!isShowInsertButton" @click="handleSubmit('update')">修改</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideModal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ref, onMounted } from 'vue'

const props = defineProps(["isShowInsertButton", "modelValue"]);
const emits = defineEmits(["update:modelValue", "insert", "update"]);

const warnings = ref({
  eventCase: false,
  roomId: false,
  content: false,
  eventDate: false,
  closeDate: false,
  status: false
});

function doinput(key, event) {
  const newObj = {
    ...props.modelValue,
    [key]: event.target.value
  }
  emits('update:modelValue', newObj);
}

function handleSubmit(action) {
  // 清除所有警告
  let isValid = true;
  for (const key of Object.keys(warnings.value)) {
    warnings.value[key] = !props.modelValue[key] && key !== 'closeDate';
    if (warnings.value[key]) isValid = false;
  }

  // 針對結束日期的特殊處理
  if (props.modelValue.status === '結案' && !props.modelValue.closeDate) {
    warnings.value.closeDate = true;
    isValid = false;
  }

  if (!isValid) return;

  // 提交操作
  emits(action);
  hideModal(); // 關閉模態框
}

const exampleRef = ref(null);
const exampleModal = ref(null);

onMounted(function () {
  exampleModal.value = new bootstrap.Modal(exampleRef.value);

  // 在模態框關閉時清除警示
  exampleRef.value.addEventListener('hidden.bs.modal', clearWarnings);
});

function showModal() {
  exampleModal.value.show();
}

function hideModal() {
  exampleModal.value.hide();
}

function clearWarnings() {
  // 清除警示訊息
  for (const key in warnings.value) {
    warnings.value[key] = false;
  }
}

defineExpose({
  showModal,
  hideModal
});
</script>

<style scoped>
.modal-content {
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    background-color: #f8f9fa; /* 淺色背景 */
}

.modal-header {
    border-bottom: 1px solid #dee2e6;
    background-color: #e9ecef; /* 標題欄背景色 */
}

.modal-title {
    font-weight: bold; /* 標題字體粗體 */
    color: #333; /* 標題顏色 */
    font-size: 1.5rem; /* 標題字體大小 */
}

.form-control, .form-select {
    border-radius: 0.375rem;
    border: 1px solid #ced4da; /* 輸入框邊框顏色 */
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.125); /* 輸入框內陰影 */
}

.form-label {
    font-weight: bold; /* 標籤字體粗體 */
    color: #495057; /* 標籤顏色 */
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    font-weight: bold; /* 按鈕字體粗體 */
    transition: background-color 0.3s, border-color 0.3s; /* 平滑過渡效果 */
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    font-weight: bold; /* 按鈕字體粗體 */
    transition: background-color 0.3s, border-color 0.3s; /* 平滑過渡效果 */
}

.btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
}

/* 中心對齊 */
.modal-footer {
    text-align: center;
}

/* 按鈕置中 */
.btn-group {
    display: flex;
    justify-content: center;
}

/* 警告文字顏色 */
.text-danger {
    color: #dc3545;
}
</style>
