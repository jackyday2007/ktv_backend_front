<template>
    

    <OrdersList
    
    
    >

    </OrdersList>



</template>
    
<script setup>
    import axiosapi from 'axios';
    import OrdersList from '@/components/order/OrdersList.vue';

    const products = ref([ ]);


    function orderList() {
        axiosapi.post( "/ktvbackend/orders/allOrders", request )
    }


    
</script>
    
<style>
    
</style>