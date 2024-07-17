<template>

        <tr>
            <td>{{ problem.problemId }}</td>
            <td>{{ problem.eventCase }}</td>
            <td>{{ problem.room }}</td>
            <td>{{ problem.content }}</td>
            <td>{{ problem.eventDate }}</td>
            <td>{{ problem.closeDate }}</td>
            <td>{{ problem.status }}</td>
        </tr>

</template>

<script  setup>

const props = defineProps(["problem"]);


</script>

<style>

  td {
        text-align: center;
    }

</style>
  