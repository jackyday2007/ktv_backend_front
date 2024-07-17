<template>

    <select class="form-select" id="inputGroupSelect01" :value="modelValue" @input="dochange">
        <option v-for=" option in options " :key="option" :value="option">{{ option }}</option>
    </select>



        
</template>
    
<script setup>

    const props = defineProps(["total", "options", "modelValue"]);
    const emits = defineEmits(["update:modelValue","change"])

    function dochange(event) {
        emits('update:modelValue', event.target.value);
        emits("change");
    }


    
</script>
    
<style>
    
</style>