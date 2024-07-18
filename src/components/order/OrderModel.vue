<template>
    <div ref="exampleRef" id="exampleModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">預約訂位</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body, input-group mb-3" >
                <span class="input-group-text" id="inputGroup-sizing-default">訂單編號</span>
                <input type="text" disabled :value="modelValue.orderId" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <input @input="doinput('orderId', $event)" type="hidden" :value="modelValue.orderId">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">顧客編號</span>
                <input type="text" @input="doinput('customerId', $event)" :value="modelValue.customerId" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">會員編號</span>
                <input @input="doinput('memberId', $event)" type="text" :value="modelValue.memberId" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3" v-show="modelValue.status != ''">
                <span class="input-group-text" id="inputGroup-sizing-default">&nbsp;包&nbsp;廂&nbsp;號&nbsp;</span>
                <input @input="doinput('room', $event)" type="text" :value="modelValue.room" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">消費人數</span>
                <input @input="doinput('numberOfPersons', $event)" type="text" :value="modelValue.numberOfPersons" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">消費日期</span>
                <input @input="doinput('orderDate', $event)" type="text" :disabled="modelValue.status === '預約'" :value="modelValue.orderDate" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">歡唱時數</span>
                <input 
                @input="doinput('hours', $event)" 
                :disabled="modelValue.status === '預約'"
                :value="modelValue.hours"
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">消費時段</span>
                <input 
                @input="doinput('startTime', $event)"
                :disabled="modelValue.status === '預約'"
                :value="modelValue.startTime"
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3" v-show="modelValue.status != ''">
                <span class="input-group-text" id="inputGroup-sizing-default">離場時間</span>
                <input type="text" disabled :value="modelValue.endTime" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3" v-show="modelValue.status != ''">
                <span class="input-group-text" id="inputGroup-sizing-default">消費狀態</span>
                <input type="text" disabled :value="modelValue.status" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3" v-show="modelValue.status != '' && modelValue.status != '預約' && modelValue.status != '報到'">
                <span class="input-group-text" id="inputGroup-sizing-default">消費金額</span>
                <input type="text" disabled :value="modelValue.subTotal" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-success" @click="emits('orderUpdate')" v-show="modelValue.status == ''">確定預約</button>
                <button type="button" class="btn btn-outline-success" @click="emits('checkIn')" v-show="modelValue.status == '預約' " >報到</button>
                <button type="button" class="btn btn-outline-danger" @click="emits('wattiing')" v-show="modelValue.status == '預約' " >取消預約</button>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
        </div>
    </div>
    </div>
        
</template>
    
<script setup>

    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'

    // ============== 變數 ==============
    const props = defineProps(["modelValue"]);
    const emits = defineEmits(["orderUpdate", "checkIn", "update:modelValue"])
    const exampleRef = ref(null);
    const exampleModal = ref(null);
    


    // =========== 開啟時載入 ===========
    
    onMounted(
        function() {
            exampleModal.value = new bootstrap.Modal(exampleRef.value);
        }
    );

    // ============== 功能 ==============

    function doinput(key, event) {
        emits('update:modelValue', {
            ...props.modelValue,
            [key]: event.target.value
        });
    }

    function showModal() {
        exampleModal.value.show();
    }
    function hideModal() {
        exampleModal.value.hide();
    }

    defineExpose({
        showModal, hideModal,
    });

    
    
</script>
    
<style>
    
</style>