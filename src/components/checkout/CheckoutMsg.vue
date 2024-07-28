<template>
    <button
    @click="handleClick"
    class="btn btn-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#checkoutMsgOffcanvas"
    aria-controls="offcanvasRight">結帳明細</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="checkoutMsgOffcanvas" aria-labelledby="offcanvasRightLabel" style="width: 45%; background-color: #343a40;">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel" style="color: white; font-size: 2.5rem;">結帳資訊</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div>
                <div class="modal-body, input-group mb-3" >
                    <span class="input-group-text" id="inputGroup-sizing-default" style="background-color: #343a40; color:white;">訂單編號</span>
                    <input :value="orderId" disabled type="text"class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <span class="input-group-text" id="inputGroup-sizing-default" style="background-color: #343a40; color:white;">房&nbsp;&nbsp;&nbsp;&nbsp;號</span>
                    <input :value="room" disabled type="text"class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
                <table class="table table-dark table-sm">
                <thead>
                    <tr>
                        <th>點餐編號</th>
                        <th>項目</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in lists">
                        <td>{{ item.orderDetailId }}</td>
                        <td>{{ item.item }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.subTotal }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="text-align: right;">收取金額:&nbsp;<input type="text" disabled style="width: 90px; background-color: #212529; color: white;" :value="checkouts.pay"></td>
                        <td>－</td>
                        <td>總計:</td>
                        <td>{{ total }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>找零:</td>
                        <td><input type="text" disabled style="width: 45px; background-color: #212529; color: white;" :value="checkouts.change"></td>
                    </tr>
                </tbody>
            </table>
                <!-- <button type="button" class="btn btn-outline-secondary" style="color: white;" @click="emits('checkoutPost')" >確定結帳</button> -->
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import axiosapi from "@/plugins/axios";
    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'


    
    const props = defineProps(["room", "orderId", "result", "modelValue"]);
    const emits = defineEmits(["checkoutMsgOffcanvas", "update:modelValue"]);
    const lists = ref({})
    const total = ref({})
    const checkouts = ref({ })

    onMounted(() => {
        const checkoutMsgOffcanvas = new bootstrap.Offcanvas(document.getElementById('checkoutMsgOffcanvas'));
    });


    function doinput( key, event ) {
        emits('update:modelValue', {
            ...props.modelValue,
            [key]: event.target.value
        })
    }

    function detailList() {
        axiosapi.get(`/ktv-app/orderDetail/${props.orderId}`)
                .then(function(response) {
                    lists.value = response.data.list;
                    total.value = response.data.total
                    console.log("detailList.response = ", response.data);
                })
                .catch()
    }

    function checkoutList() {
        axiosapi.get(`/ktv-app/checkout/${props.orderId}`)
                .then(function(response) {
                    checkouts.value = response.data.list[0];
                    console.log("checkoutList.response = ", response.data.list[0]);
                })
                .catch()
    }

    function handleClick() {
        emits('update:modelValue', {
            orderId: props.orderId,
            room: props.room
        });
        checkoutMsgOffcanvas;
        detailList();
        checkoutList();
    }


</script>
    
<style>
    
</style>