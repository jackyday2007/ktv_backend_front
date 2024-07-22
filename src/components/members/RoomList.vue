<template>
    
    <tbody>
        <tr>
            <td>{{ room.roomId }}</td>
            <td>{{ room.size }}</td>
            <td>{{ room.price }}</td>
            <td>{{ room.status }}</td>
            <!-- <td>{{ room.photoFile }}</td> -->
            <td><button type="button" class="btn btn-outline-dark" @click="handleUpdate" >修改</button></td>
        </tr>
    </tbody>
    
</template>
    
<script setup>
    const props = defineProps(['room']);
    const emits = defineEmits(['roomUpdate']);

    function handleUpdate(){
        emits('roomUpdate',props.room.roomId);
    }
</script>
    
<style>
    
</style>