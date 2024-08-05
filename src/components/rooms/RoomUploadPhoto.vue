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
        <!-- <button
          type="button"
          @click="triggerFileUpload"
          class="btn btn-outline-success"
        >
          選擇並上傳照片
        </button> -->
        <font-awesome-icon :icon="['fas', 'image']" @click="triggerFileUpload" class="icon-large"/>
        <span v-if="photoFile" class="file-name">{{ photoFile.name }}</span>
        <span v-if="uploadStatus" class="status upload-status">{{ uploadStatus }}</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axiosapi from '@/plugins/axios';

library.add(faImage);

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

  axiosapi.post('/photos/uploadPost', formData, {
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

.upload-form {
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
  margin-left: 15px; /* 增加與其他元素的距離 */
  font-weight: bold;
}

/* 使 Font Awesome 圖標變大 */
.icon-large {
  font-size: 2rem; /* 調整大小，可以根據需要設置 */
  cursor: pointer; /* 使圖標看起來可以點擊 */
  margin-left: 10px; /* 調整與其他元素的距離 */
}
</style>
