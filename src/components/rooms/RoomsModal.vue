<template>
  <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">包廂資訊</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearWarnings"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="roomId" class="form-label">包廂號碼</label>
              <input type="text" id="roomId" name="roomId" :value="modelValue.roomId" @input="doinput('roomId', $event)" class="form-control" placeholder="輸入包廂號碼">
              <div v-if="warnings.roomId" class="text-danger mt-2">需填入包廂號碼</div>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">包廂金額(3小時)</label>
              <input type="text" id="price" name="price" :value="modelValue.price" @input="doinput('price', $event)" class="form-control" placeholder="輸入包廂金額">
              <div v-if="warnings.price" class="text-danger mt-2">需填入包廂金額</div>
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">包廂狀態</label>
              <select id="status" name="status" :value="modelValue.status" @input="doinput('status', $event)" class="form-select" :disabled="!isShowInsertButton">
                <option value="">選擇包廂狀態</option>
                <option value="使用中" :disabled="!isShowInsertButton && modelValue.status === '使用中'">使用中</option>
                <option value="開放中" :disabled="!isShowInsertButton && modelValue.status === '開放中'">開放中</option>
                <option value="維護中" :disabled="!isShowInsertButton && modelValue.status === '維護中'">維護中</option>
              </select>
              <div v-if="warnings.status" class="text-danger mt-2">需填入包廂狀態</div>
            </div>
            <div class="mb-3">
              <label for="size" class="form-label">包廂大小</label>
              <select id="size" name="size" :value="modelValue.size" @input="doinput('size', $event)" class="form-select">
                <option value="">選擇包廂大小</option>
                <option>小</option>
                <option>中</option>
                <option>大</option>
              </select>
              <div v-if="warnings.size" class="text-danger mt-2">需填入包廂大小</div>
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
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const props = defineProps(["isShowInsertButton", "modelValue"]);
const emits = defineEmits(["update:modelValue", "insert", "update"]);

const warnings = ref({
  roomId: false,
  price: false,
  status: false,
  size: false
});

function doinput(key, event) {
  const newObj = {
    ...props.modelValue,
    [key]: event.target.value
  };
  emits('update:modelValue', newObj);
}

function handleSubmit(action) {
  // 清除所有警告
  clearWarnings();

  // 先檢查 ID 欄位
  if (!props.modelValue.roomId) {
    Swal.fire({
      icon: 'warning',
      title:'包廂號碼不能為空⚠',
    });
    warnings.value.roomId = true;
  } else {
    // 如果 ID 欄位有值，再檢查其他欄位
    warnings.value.roomId = !props.modelValue.roomId;
    warnings.value.price = !props.modelValue.price;
    warnings.value.status = !props.modelValue.status;
    warnings.value.size = !props.modelValue.size;

    let isValid = true;
    for (const key of Object.keys(warnings.value)) {
      if (warnings.value[key]) isValid = false;
    }

    // // 新增模式下，包廂狀態只能是「開放中」
    // if (props.isShowInsertButton && props.modelValue.status !== '開放中') {
    //   warnings.value.status = true;
    //   Swal.fire({
    //     icon: 'warning',
    //     title:'新增時包廂狀態只能為開放中⚠',
    //   });
    //   isValid = false;
    // }

    if (!isValid) return;
  }

  // 提交操作
  emits(action);
  hideModal(); // 關閉模態框
}

function clearWarnings() {
  warnings.value = {
    roomId: false,
    price: false,
    status: false,
    size: false
  };
}

const exampleRef = ref(null);
const exampleModal = ref(null);

onMounted(() => {
  exampleModal.value = new bootstrap.Modal(exampleRef.value);
});

function showModal() {
  clearWarnings(); // 顯示模態框前清除警告
  exampleModal.value.show();
}

function hideModal() {
  exampleModal.value.hide();
}

defineExpose({
  showModal,
  hideModal
});
</script>

<style scoped>
/* 使用現有的 CSS 样式 */
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
