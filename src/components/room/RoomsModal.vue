<template>
        <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">包廂資訊</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table>
              <tr>
                <td>包廂號碼 :</td>
                <td><input type="text" name="roomId" :value="modelValue.roomId" @input="doinput('roomId',$event)"></td>
              </tr>
              <tr>
                <td>包廂金額 :</td>
                <td><input type="text" name="price" :value="modelValue.price" @input="doinput('price',$event)"></td>
              </tr>
              <tr>
                <td>包廂狀態 :</td>
                <td><input type="text" name="status" :value="modelValue.status" @input="doinput('status',$event)"></td>
              </tr>
              <tr>
                <td>包廂大小 :</td>
                <td><select name="size" :value="modelValue.size" @input="doinput('size',$event)" class="col-lg-12">
                  <option>小包廂</option>
                  <option>中包廂</option>
                  <option>大包廂</option>
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