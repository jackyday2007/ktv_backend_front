<template>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                

            </button>
            
            
            <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                
                <div class="offcanvas-header">
                    <img src="../assets/GOLD-PANDA.png" style="width: 100px; height: 40px;" @click="goHome">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">KTV櫃台系統</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav">
                            <li><RouterLink class="nav-link active" to="/">首頁</RouterLink></li>
                            <li class="nav-item">
                                <RouterLink :to="{ name : 'secure-link-router' }" class="nav-link active" aria-current="page" >登入</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink :to="{ name : 'orders-list-router' }" class="nav-link active" aria-current="page" >訂單資訊</RouterLink>
                            </li>
                            <li><RouterLink class="nav-link active" to="/router/rooms">包廂管理</RouterLink></li>
                            <li><RouterLink class="nav-link active" to="/router/roomHistory">包廂紀錄</RouterLink></li>
                            <li><RouterLink class="nav-link active" to="/router/problems">問題管理</RouterLink></li>
                           
                        </ul>
                    </div>
            </div>
            <div>
                <span v-if="user" style="color: white;">目前使用者：{{ user }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <font-awesome-icon v-if="!user" @click="login" icon="fa-solid fa-right-to-bracket" size="2xl" style="color: #ffffff;"  />
                <font-awesome-icon v-if="user" @click="logout" icon="fa-solid fa-right-from-bracket" size="2xl" style="color: #ffffff;"  />
                
            </div>
            
        </div>
        
    </nav>
    

</template>
    
<script setup>
    import axiosapi from '@/plugins/axios';
    import Swal from 'sweetalert2';
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    import { inject } from 'vue'

    const router = useRouter();
    const user = inject('user')

    function login() {
        router.push("/secure/login");
    }

    function logout() {
        Swal.fire({
            icon: 'question',
            text: '確定登出?',
            allowOutsideClick: false,
            showConfirmButton: true,
            showCancelButton: true,
        }).then(function(result) {
            if (result.isConfirmed) {
                Swal.fire({
                    text: '登出中',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                })
                axiosapi.post("/ktv-app/orders/logout")
                        .then(function(response) {
                            if ( response.data.success ) {
                                Swal.fire({
                                    icon: 'success',
                                    text: response.data.message
                                }).then(function(result) {
                                    sessionStorage.clear();
                                    window.location.reload();
                                    router.push("/secure/login");
                                })
                            }
                        })
                        .catch(function ( error ) {
                            Swal.fire({
                                icon: 'error',
                                text: error.message
                            })
                        })
            }
        })
    }
    function goHome() {
        router.push("/");
    }



</script>
    
<style>
    
</style>