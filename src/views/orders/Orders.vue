<template>
    

    <!-- <OrdersList
    v-for=" item in orders "
    :key="item.id"
    :order="item"
    >
    
    </OrdersList> -->

    <button @click="orderList" >按鈕</button>

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
                console.log("response=" , response)
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
    
</style>