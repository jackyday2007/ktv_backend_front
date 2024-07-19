<template>
    
        <tr>
            <td>{{ problem.problemId }}</td>
            <td>{{ problem.eventCase }}</td>
            <td v-show="!problem.room">{{ problem.roomId }}</td>
            <td v-show="problem.room">{{ problem.room }}</td>
            <td>{{ problem.content }}</td>
            <td>{{ problem.eventDate }}</td>
            <td>{{ problem.closeDate }}</td>
            <td>{{ problem.status }}</td>
            <td><button type="button" class="btn btn-outline-dark" @click="handleUpdate" >修改</button></td>
        </tr>

</template>

<script  setup>

const props = defineProps(["problem"]);
const emits = defineEmits(["problemUpdate"]);

function handleUpdate(){
    emits('problemUpdate', props.problem.problemId);
    
}
</script>

<style>

  td {
        text-align: center;
    }

</style>
  