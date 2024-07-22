<template>
    <button
    @click="showMenuOffcanvas"
    class="btn btn-outline-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#menuOffcanvas"
    aria-controls="offcanvasRight">點餐</button>

    <div class="offcanvas offcanvas-end"
    tabindex="-1"
    id="menuOffcanvas"
    aria-labelledby="offcanvasRightLabel"
    style="width: 40%;
    background-color: #343a40;">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel" style="color: white; font-size: 2.5rem;">菜單</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default" style="background-color: #343a40;  color:white">品項</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <span class="input-group-text" id="inputGroup-sizing-default" style="background-color: #343a40;  color:white">品名</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <table class="table table-dark table-sm" >
            <thead>
                <tr>
                    <th>選項</th>
                    <th>品項</th>
                    <th>品名</th>
                    <th>容量</th>
                    <th >價格(新台幣)</th>
                    <th>數量</th>
                </tr>
            </thead>
            <tbody>
                <Menus
                v-for=" item in orderMenus "
                :key="item.itemId"
                :menu="item"
                >
                </Menus>
            </tbody>
        </table>
        <div class="offcanvas-body">
            <div>
                <p style="color: red;" v-show="resultMenu != null" >{{ resultMenu }}</p>
                <button type="button" class="btn btn-outline-dark" >送出</button>
            </div>
        </div>
    </div>
</template>
    
<script setup>

    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'
    import Menus from "./Menus.vue";
    import axiosapi from "@/plugins/axios";


    const props = defineProps([ "resultMenu", "modelValue"]);
    const emits = defineEmits(["showMenuOffcanvas", "update:modelValue"]);
    const orderMenus = ref({})


    onMounted(() => {
        const menuOffcanvas = new bootstrap.Offcanvas(document.getElementById('menuOffcanvas'));
        allOrderMenu();
    });

    function doinput( key, event ) {
        emits('update:modelValue', {
            ...props.modelValue,
            [key]: event.target.value
        })
    }
    

    function allOrderMenu() {
        let request= {
            "start": 0,
            "max": 10,
            "dir" : false,
            "order" : "itemId"
        }
        axiosapi.post("/ktv-app/orderMenu/allMenu", request)
                .then(function(response) {
                    console.log("orderMenu = ", response.data)
                    orderMenus.value = response.data.list;
                })
                .catch()
    }

</script>
    
<style>

</style>