<template>
    <div>
        <table>
        <thead>
            <tr>
            <th>編號</th>
            <th>發生日期</th>
            <th>事件</th>
            <th>狀態</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="problem in problems" :key="problem.problemId">
            <td>{{ problem.problemId }}</td>
            <td>{{ problem.eventDate }}</td>
            <td>{{ problem.eventCase }}</td>
            <td>{{ problem.status }}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script  setup>
import axiosapi from '@/plugins/axios';
import Swal from 'sweetalert2';

axiosapi.post("/ktv-app/problems/findAll" ).then(function(response){
    console.log("response=" + response);
}).catch(function(error){
    console.log("error=" + error);
});

</script>

<style>

</style>
  