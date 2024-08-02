<template>
    <button
    @click="handleClick"
    class="btn btn-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#consumerOffcanvas"
    aria-controls="offcanvasRight"
    >消費明細</button>
    

    <div class="offcanvas offcanvas-end" tabindex="-1" id="consumerOffcanvas" aria-labelledby="offcanvasRightLabel" style="width: 50%; background-color: #343a40;">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel" style="color: white; font-size: 2.5rem;">消費明細</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p style="color: white;">包廂費計價方式為：基本包廂費用(3H)&nbsp;+&nbsp;(&nbsp;(&nbsp;消費時數&nbsp;-&nbsp;最低時數)&nbsp;*&nbsp;加收費用&nbsp;)</p>
            <p style="color: white;">加收費用：大包廂&nbsp;-&nbsp;2000、中包廂&nbsp;-&nbsp;1500、小包廂&nbsp;-&nbsp;1000</p>
            <table class="table table-dark table-sm">
                <thead>
                    <tr>
                        <th>點餐編號</th>
                        <th>訂單編號</th>
                        <th>餐點</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                        <th>點餐時間</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list">
                        <td>{{ item.orderDetailId }}</td>
                        <td>{{ item.orderId }}</td>
                        <td>{{ item.item }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.subTotal }}</td>
                        <td>{{ item.createTime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
    
<script setup>

    import Paginate from 'vuejs-paginate-next';
    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'
    import axiosapi from "@/plugins/axios";


    // ============== 變數 ==============
    const props = defineProps(["orderId",  "modelValue"]);
    const emits = defineEmits(["consumerOffcanvas", "update:modelValue"]);

    // 分頁
    const total = ref(0);
    const pages = ref(0);
    const orderMenus = ref({})
    const current = ref(0);
    const rows = ref(10);
    const start = ref(0);
    const lastPageRows = ref(0);

    const list = ref({})




    onMounted(() => {
        const consumerOffcanvas = new bootstrap.Offcanvas(document.getElementById('consumerOffcanvas'));
    });


    function detailList() {
        axiosapi.get(`/ktv-app/orderDetail/${props.orderId}`)
                .then(function(response) {
                    list.value = response.data.list;
                    console.log("detailList.response = ", response.data);
                })
                .catch()
    }
    
    function handleClick() {
        consumerOffcanvas;
        detailList();
    }

</script>
    
<style>

</style>