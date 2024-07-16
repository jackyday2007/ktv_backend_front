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
        <td>{{ order.status }}</td>
        
    </tr>
</template>
    
<script setup>

    const props = defineProps(["order"])


    
</script>
    
<style>
    

    td {
        text-align: center;
    }


</style>