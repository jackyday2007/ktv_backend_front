<template>
  <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">問題資訊</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
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
              </div>
            </div>
            <div class="mb-3 row">
              <label for="roomId" class="col-sm-4 col-form-label">包廂號碼</label>
              <div class="col-sm-8">
                <input type="text" id="roomId" name="roomId" :value="modelValue.roomId" @input="doinput('roomId', $event)" class="form-control" placeholder="輸入包廂號碼" :disabled="!isShowInsertButton" >
              </div>
            </div>
            <div class="mb-3 row">
              <label for="content" class="col-sm-4 col-form-label">說明內容</label>
              <div class="col-sm-8">
                <input type="text" id="content" name="content" :value="modelValue.content" @input="doinput('content', $event)" class="form-control" placeholder="輸入說明內容">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventDate" class="col-sm-4 col-form-label">發生日期</label>
              <div class="col-sm-8">
                <input type="date" id="eventDate" name="eventDate" :value="modelValue.eventDate" @input="doinput('eventDate', $event)" class="form-control">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="closeDate" class="col-sm-4 col-form-label">結案日期</label>
              <div class="col-sm-8">
                <input type="date" id="closeDate" name="closeDate" :value="modelValue.closeDate" @input="doinput('closeDate', $event)" class="form-control">
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
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" v-show="isShowInsertButton" @click="emits('insert')">新增</button>
          <button type="button" class="btn btn-primary" v-show="!isShowInsertButton" @click="emits('update')">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(["isShowInsertButton", "modelValue"]);
  const emits = defineEmits(["update:modelValue", "insert", "update"]);

  function doinput(key, event) {
    const newObj = {
      ...props.modelValue,
      [key]: event.target.value
    }
    emits('update:modelValue', newObj);
  }

  import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
  import { ref, onMounted } from 'vue'
  const exampleRef = ref(null);
  const exampleModal = ref(null);

  onMounted(function () {
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
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 1.5rem;
}

.form-control, .form-select {
  border-radius: 0.375rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}
</style>
