<template>
    <button
    @click="showMenuOffcanvas"
    class="btn btn-outline-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#menuOffcanvas"
    aria-controls="offcanvasRight">點餐</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="menuOffcanvas" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">菜單</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>


        <table>
            <tr>
                <th>品項</th>
                <th>品名</th>
                <th>容量</th>
                <th>價格</th>
            </tr>
        </table>






        <div class="offcanvas-body">
            <div class="modal-body, input-group mb-3" >
                    <span class="input-group-text" id="inputGroup-sizing-default">會&nbsp;員&nbsp;編&nbsp;號</span>
                    <input type="text" :value="modelValue.memberId" disabled class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <input type="hidden" :value="modelValue.memberId">
            </div>
            <div class="modal-body, input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">電&nbsp;話&nbsp;號&nbsp;碼</span>
                    <input type="text"
                    :value="modelValue.phone"
                    @input="doinput('phone', $event)"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
            </div>
            <div>
                <p style="color: red;" v-show="resultMenu != null" >{{ resultMenu }}</p>
                <button type="button" class="btn btn-outline-secondary" @click="emits('checkMemberPhone')">查詢</button>
            </div>
        </div>
    </div>
</template>
    
<script setup>

    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'

    const props = defineProps(["menu", "resultMenu", "modelValue"]);
    const emits = defineEmits(["showMenuOffcanvas", "update:modelValue"]);

    onMounted(() => {
        const menuOffcanvas = new bootstrap.Offcanvas(document.getElementById('menuOffcanvas'));
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