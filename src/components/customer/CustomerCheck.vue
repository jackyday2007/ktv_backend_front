<template>
    <button
    @click="showCustomerOffcanvas"
    class="btn btn-outline-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#customerOffcanvas"
    aria-controls="offcanvasRight">檢查</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="customerOffcanvas" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">顧客資訊</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="modal-body, input-group mb-3" >
                    <span class="input-group-text" id="inputGroup-sizing-default">顧&nbsp;客&nbsp;編&nbsp;號</span>
                    <input type="text" :value="modelValue.customerId" disabled class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <input type="hidden" :value="modelValue.customerId">
            </div>
            <div class="modal-body, input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">身分證字號</span>
                    <input type="text"
                    :value="modelValue.idNumber"
                    @input="doinput('idNumber', $event)"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="modal-body, input-group mb-3" v-show="modelValue.customerId == ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                    <input type="text"
                    :value="modelValue.name"
                    @input="doinput('name', $event)"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="modal-body, input-group mb-3" v-show="modelValue.customerId == ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</span>
                    <input type="date"
                    :value="modelValue.birth"
                    @input="doinput('birth', $event)"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="modal-body, input-group mb-3" v-show="modelValue.customerId == ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">電&nbsp;話&nbsp;號&nbsp;碼</span>
                    <input type="text"
                    :value="modelValue.phone"
                    @input="doinput('phone', $event)"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
            <div>
                <p style="color: red;" v-show="result != null" >{{ result }}</p>
                <button type="button" class="btn btn-outline-secondary" @click="emits('checkCustomerId')">查詢</button>
                <button type="button" class="btn btn-outline-secondary" v-show="modelValue.customerId == ''" @click="emits('customerInsert')">新增</button>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'
    
    const props = defineProps(["result", "modelValue"]);
    const emits = defineEmits(["showCustomerOffcanvas","customerInsert", "checkCustomerId", "update:modelValue"]);

    onMounted(() => {
        const customerOffcanvas = new bootstrap.Offcanvas(document.getElementById('customerOffcanvas'));
    });


    function doinput( key, event ) {
        emits('update:modelValue', {
            ...props.modelValue,
            [key]: event.target.value
        })
    }




</script>
    
<style>
    
</style>