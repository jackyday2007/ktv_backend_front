<template>
    <tr>
        <td><input type="checkbox" class="form-check-input me-1"></td>
        <td>{{ menu.category }}</td>
        <td>{{ menu.itemName }}</td>
        <td>{{ menu.capacity }}</td>
        <td>$&nbsp;{{ menu.price }}</td>
        <td style="width: 17%;"><input type="text" style="width: 30%;"></td>
    </tr>

        

</template>
    
<script setup>

    const props = defineProps(["menu"])
    
</script>
    
<style>
    
</style>