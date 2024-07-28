<template>

        <tr>
            <td>{{ room.roomId }}</td>
            <td>{{ room.size }}</td>
            <td>{{ room.price }}</td>
            <td>{{ room.status }}</td>
            <!-- <td>{{ room.photoFile }}</td> -->
            <td><button type="button" class="btn btn-outline-dark" @click="handleUpdate" >修改</button></td>
        </tr>

    
</template>
    
<script setup>
    const props = defineProps(['room']);
    const emits = defineEmits(['roomUpdate']);

    function handleUpdate(){
        emits('roomUpdate',props.room.roomId);
    }
</script>
    
<style scoped>
.button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.button-group .btn {
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.btn-outline-dark {
    border-color: #343a40;
    color: #343a40;
}

.table {
    margin-top: 20px;
    width: 100%;
}

.table th, .table td {
    text-align: center;
    vertical-align: middle;
}

.table th {
    background-color: #f8f9fa;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: #f2f2f2;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>
