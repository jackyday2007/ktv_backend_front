<template>
    <div>
      <button type="button" class="btn btn-outline-info" @click="showModal">新增問題</button>
      
      <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">新增問題</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="hideModal"></button>
            </div>
            <div class="modal-body">
              <table>
                <tr>
                  <td>eventCase :</td>
                  <td><input type="text" name="eventCase" :value="modelValue.eventCase" @input="doinput('eventCase', $event)"></td>
                </tr>
                <tr>
                  <td>room :</td>
                  <td><input type="text" name="room" :value="modelValue.room" @input="doinput('room', $event)"></td>
                </tr>
                <tr>
                  <td>content :</td>
                  <td><input type="text" name="content" :value="modelValue.content" @input="doinput('content', $event)"></td>
                </tr>
                <tr>
                  <td>eventDate :</td>
                  <td><input type="text" name="eventDate" :value="modelValue.eventDate" @input="doinput('eventDate', $event)"></td>
                </tr>
                <tr>
                  <td>closeDate :</td>
                  <td><input type="text" name="closeDate" :value="modelValue.closeDate" @input="doinput('closeDate', $event)"></td>
                </tr>
                <tr>
                  <td>status :</td>
                  <td><input type="text" name="status" :value="modelValue.status" @input="doinput('status', $event)"></td>
                </tr>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="hideModal">關閉</button>
              <button type="button" class="btn btn-primary" @click="submitForm">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
    
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue', 'submit']);
  
  const exampleRef = ref(null);
  const exampleModal = ref(null);
  
  function doinput(key, event) {
    const newObj = {
      ...props.modelValue,
      [key]: event.target.value
    };
    emit('update:modelValue', newObj);
  }
  
  onMounted(function() {
    exampleModal.value = new bootstrap.Modal(exampleRef.value);
  });
  
  function showModal() {
    exampleModal.value.show();
  }
  
  function hideModal() {
    exampleModal.value.hide();
  }
  
  function submitForm() {
    // 處理提交表單邏輯
    emit('submit', props.modelValue);
    hideModal();
  }
  
  defineExpose({
    showModal,
    hideModal
  });
  </script>
  
    
<style>
    
</style>