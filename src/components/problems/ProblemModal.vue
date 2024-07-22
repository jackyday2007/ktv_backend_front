<template>

  <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table>
              <tr>
                <td>eventCase :</td>
                <td><input type="text" name="eventCase" :value="modelValue.eventCase" @input="doinput('eventCase',$event)"></td>
              </tr>
              <tr>
                <td>roomId :</td>
                <td><input type="text" name="roomId" :value="modelValue.roomId" @input="doinput('roomId',$event)"></td>
              </tr>
              <tr>
                <td>content :</td>
                <td><input type="text" name="content" :value="modelValue.content" @input="doinput('content',$event)"></td>
              </tr>
              <tr>
                <td>eventDate :</td>
                <td><input type="text" name="eventDate" :value="modelValue.eventDate" @input="doinput('eventDate',$event)"></td>
              </tr>
              <tr>
                <td>closeDate :</td>
                <td><input type="text" name="closeDate" :value="modelValue.closeDate" @input="doinput('closeDate',$event)"></td>
              </tr>
              <tr>
                <td>status :</td>
                <!-- <td><input type="text" name="status" :value="modelValue.status" @input="doinput('status',$event)"></td> -->
                <td><select name="status" :value="modelValue.status" @input="doinput('status',$event)" class="col-lg-12" >
                  <option>處理中</option>
                  <option>結案</option>
                </select></td>
              </tr>
            </table>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-show="isShowInsertButton" @click="emits('insert')">新增</button>
          <button type="button" class="btn btn-primary" v-show="!isShowInsertButton" @click="emits('update')">修改</button>
      </div>
      </div>
  </div>
  </div>
</template>
  
<script setup >
  const props = defineProps(["isShowInsertButton","modelValue"]);
  const emits = defineEmits(["update:modelValue" , "insert" , "update"]);

  function doinput(key , event){
      const newObj={
          ...props.modelValue,
          [key]: event.target.value
      }
      emits('update:modelValue',newObj);
  }

  import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
  import {ref , onMounted , defineExpose} from 'vue'
  const exampleRef = ref(null);
  const exampleModal = ref(null);
  
  onMounted(function(){
      exampleModal.value = new bootstrap.Modal(exampleRef.value);
  });

  function showModal(){
      exampleModal.value.show();
  }
  function hideModal(){
      exampleModal.value.hide();
  }

  defineExpose({
      showModal,
      hideModal
  });
</script>
  
<style>
  
</style>