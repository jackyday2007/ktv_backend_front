<template>

<Navigation></Navigation>
<RouterView></RouterView>


  
</template>
  
<script setup>
  
  import Navigation from './views/Navigation.vue';
  import { ref, provide } from 'vue'
  
  const user = ref(null);
  const token = ref(null);
  provide('user', user)
  provide('setUser', (newUser) => {
    user.value = newUser;
    }
  )


</script>
  
<style>

  
  body {
    padding-top: 70px; /* 70px 是 Bootstrap 默认导航栏的高度 */
    background: url('/src/assets/pexels-apasaric-1323712.jpg');
    background-size: cover;
  }
</style>