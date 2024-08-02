<template>
  <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">包廂資訊</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="roomId" class="form-label">包廂號碼</label>
              <input type="text" id="roomId" name="roomId" :value="modelValue.roomId" @input="doinput('roomId', $event)" class="form-control" placeholder="輸入包廂號碼">
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">包廂金額(3小時)</label>
              <input type="text" id="price" name="price" :value="modelValue.price" @input="doinput('price', $event)" class="form-control" placeholder="輸入包廂金額">
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">包廂狀態</label>
              <select id="status" name="status" :value="modelValue.status" @input="doinput('status', $event)" class="form-select">
                <option value="">選擇包廂狀態</option>
                <option>使用中</option>
                <option>開放中</option>
                <option>維護中</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="size" class="form-label">包廂大小</label>
              <select id="size" name="size" :value="modelValue.size" @input="doinput('size', $event)" class="form-select">
                <option value="">選擇包廂大小</option>
                <option>小</option>
                <option>中</option>
                <option>大</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary" v-show="isShowInsertButton" @click="emits('insert')">新增</button>
          <button type="button" class="btn btn-primary" v-show="!isShowInsertButton" @click="emits('update')">修改</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const props = defineProps(["isShowInsertButton", "modelValue"]);
const emits = defineEmits(["update:modelValue", "insert", "update"]);

function doinput(key, event) {
    const newObj = {
        ...props.modelValue,
        [key]: event.target.value
    };
    emits('update:modelValue', newObj);
}

const exampleRef = ref(null);
const exampleModal = ref(null);

onMounted(() => {
    exampleModal.value = new bootstrap.Modal(exampleRef.value);
});

function showModal() {
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
.modal-content {
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    background-color: #ffffff; /* 使用白色背景 */
    border: 1px solid #dee2e6; /* 增加邊框 */
}

.modal-header {
    border-bottom: 1px solid #dee2e6;
    background-color: #f1f1f1; /* 淺灰色背景 */
}

.modal-body {
    padding: 1.5rem;
}

.modal-title {
    font-weight: 600; /* 標題字體稍粗體 */
    color: #333; /* 標題顏色 */
    font-size: 1.5rem; /* 調整字體大小 */
}

.form-control, .form-select {
    border-radius: 0.375rem;
    border: 1px solid #ced4da; /* 輸入框邊框顏色 */
    padding: 0.75rem; /* 增加內邊距 */
    font-size: 1rem; /* 字體大小 */
}

.form-label {
    font-weight: 600; /* 標籤字體稍粗體 */
    color: #495057; /* 標籤顏色 */
    font-size: 1rem; /* 標籤字體大小 */
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    font-weight: 600; /* 按鈕字體稍粗體 */
    border-radius: 0.375rem; /* 按鈕圓角 */
    padding: 0.5rem 1.5rem; /* 按鈕內邊距 */
    font-size: 1rem; /* 按鈕字體大小 */
    transition: background-color 0.3s, border-color 0.3s; /* 平滑過渡效果 */
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); /* 按鈕陰影 */
}

.btn-primary:hover {
    background-color: #0056b3; /* 懸停顏色 */
    border-color: #004085; /* 懸停邊框顏色 */
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15); /* 懸停陰影 */
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    font-weight: 600; /* 按鈕字體稍粗體 */
    border-radius: 0.375rem; /* 按鈕圓角 */
    padding: 0.5rem 1.5rem; /* 按鈕內邊距 */
    font-size: 1rem; /* 按鈕字體大小 */
    transition: background-color 0.3s, border-color 0.3s; /* 平滑過渡效果 */
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); /* 按鈕陰影 */
}

.btn-secondary:hover {
    background-color: #5a6268; /* 懸停顏色 */
    border-color: #545b62; /* 懸停邊框顏色 */
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15); /* 懸停陰影 */
}

.modal-footer {
    border-top: 1px solid #dee2e6;
    background-color: #f1f1f1; /* 淺灰色背景 */
    display: flex;
    justify-content: center; /* 置中對齊 */
    gap: 1rem; /* 按鈕之間的間距 */
    padding: 1rem; /* 增加內邊距 */
}
</style>
