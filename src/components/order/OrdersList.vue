<template>
    <tr>
        <td>{{ order.orderId }}</td>
        <td>{{ order.memberId }}</td>
        <td>{{ order.customerId }}</td>
        <td>{{ order.room }}</td>
        <td>{{ order.orderDate }}</td>
        <td>{{ order.hours }}小時</td>
        <td>{{ order.startTime }}</td>
        <td>{{ order.endTime }}</td>
        <td>{{ order.subTotal }}</td>
        <td>{{ order.status }}</td>
    </tr>
</template>
    
<script setup>
    
    // ============ 變數 ============
    const props = defineProps(["order"])
    console.log("get = ", sessionStorage.getItem('token'))

    

    
</script>
    
<style>
    

    td {
        text-align: center;
    }


</style>