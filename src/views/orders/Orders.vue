<template>
    <div>
    <h3>訂位清單</h3>
    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">訂單編號</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <span class="input-group-text" id="inputGroup-sizing-default">會員編號</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <span class="input-group-text" id="inputGroup-sizing-default">包廂號</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <label class="input-group-text" for="inputGroupSelect01">銷費狀態</label>
        <select class="form-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
    </div>

    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>
                    訂單編號
                </th>
                <th>
                    會員編號
                </th>
                <th>
                    顧客編號
                </th>
                <th>
                    包廂號
                </th>
                <th>
                    消費日期
                </th>
                <th>
                    歡唱時數
                </th>
                <th>
                    入場時間
                </th>
                <th>
                    離場時間
                </th>
                <th>
                    目前銷費狀態
                </th>
            </tr>
        </thead>
        <tbody>
        <OrdersList
            v-for=" item in orders "
            :key="item.id"
            :order="item"
        >
        </OrdersList>
        </tbody>
    </table>

    </div>

    <!-- <button @click="orderList" >按鈕</button> -->

</template>
    
<script setup>
    import axiosapi from '@/plugins/axios';
    import OrdersList from '@/components/order/OrdersList.vue';
    import { onMounted, ref } from 'vue';

    onMounted (
        function() {
            orderList()
        }
    )

    const orders = ref([ ]);

    function orderList() {
        axiosapi.post( "/ktv-app/ktvbackend/orders/allOrders")
            .then( function( response ) {
                orders.value = response.data.list;
            } )
            .catch(
                function( error ) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        text: "查詢失敗" + error.message
                    })
                }
            )
    }


    
</script>
    
<style>
    
    tr {
        text-align: center;
    }


</style>