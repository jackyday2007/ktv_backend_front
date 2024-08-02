<template>
  <div class="upload-container">
    <form @submit.prevent="uploadPhoto" class="upload-form">
      <div class="form-group">
        <input
          type="file"
          id="photoFile"
          @change="handleFileUpload"
          ref="fileInput"
          style="display: none;"
        />
        <button
          type="button"
          @click="triggerFileUpload"
          class="upload-button btn btn-outline-info"
        >
          選擇並上傳照片
        </button>
        <span v-if="photoFile" class="file-name">{{ photoFile.name }}</span>
        <span v-if="uploadStatus" class="status upload-status">{{ uploadStatus }}</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const photoName = ref('');
const photoFile = ref(null);
const uploadStatus = ref('');

function handleFileUpload(event) {
  photoFile.value = event.target.files[0];
  photoName.value = photoFile.value.name;
}

function uploadPhoto() {
  if (!photoFile.value) {
    uploadStatus.value = '請選擇一個文件';
    return;
  }

  const formData = new FormData();
  formData.append('photoName', photoName.value);
  formData.append('photoFile', photoFile.value);

  axios.post('/ktvbackend/photos/uploadPost', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .then(function(response) {
    uploadStatus.value = '成功上傳';
    photoName.value = '';
    photoFile.value = null;
    document.querySelector('#photoFile').value = ''; // Clear the file input
  })
  .catch(function(error) {
    uploadStatus.value = '上傳失敗: ' + error.message;
  });
}

function triggerFileUpload() {
  const fileInput = document.getElementById('photoFile');
  fileInput.click();
  fileInput.addEventListener('change', function(event) {
    handleFileUpload(event);
    uploadPhoto(); // Trigger upload once file is selected
  }, { once: true }); // Ensure the listener is called only once
}
</script>

<style scoped>
.upload-container {
  display: flex;
  align-items: center;
}

.upload-button {
  margin-right: 10px;
}

.file-name {
  margin-left: 10px;
}

.upload-status {
  margin-left: 10px;
  font-weight: bold;
}
</style>
