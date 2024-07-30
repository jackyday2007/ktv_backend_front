<template>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                

            </button>
            
            
            <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <img src="../assets/GOLD-PANDA.png" style="width: 100px; height: 40px;">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">KTV櫃台系統</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav">
                            <li><RouterLink class="nav-link active" to="/">首頁</RouterLink></li>
                            <li class="nav-item">
                                <RouterLink :to="{ name : 'orders-list-router' }" class="nav-link active" aria-current="page" >訂單資訊</RouterLink>
                                
                            </li>
                            <li><RouterLink class="nav-link active" to="/router/rooms">包廂管理</RouterLink></li>
                            <li><RouterLink class="nav-link active" to="/router/roomHistory">包廂紀錄</RouterLink></li>
                            <li><RouterLink class="nav-link active" to="/router/problems">問題管理</RouterLink></li>
                           
                        </ul>
                    </div>
            </div>
            
        </div>
    </nav>
    

</template>
    
<script setup>
    
    import { RouterLink } from 'vue-router';



</script>
    
<style>
    
</style>