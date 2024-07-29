<template>


            <h1 style="margin-left: 520px;">KTV櫃台系統</h1>
            <table style="margin-left: 500px;">
                <tr>
                    <td></td>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">帳號 : </span>
                        <input  name="username" v-model="account" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="請輸入帳號">
                    </div>
                </tr>
                <tr>
                    <td></td>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">密碼 : </span>
                        <input name="password" v-model="password" type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="請輸入密碼">
                    </div>
                </tr>
                <tr>
                    <td></td>
                    <td align="right"><button type="button" class="btn btn-outline-secondary">登入</button></td>
                </tr>
            </table>

</template>
    
<script setup>

    import { ref } from 'vue'

    const account = ref("")
    const password = ref("")
    
</script>
    
<style>

    
</style>