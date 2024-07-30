<template>


            <h1 style="margin-left: 520px;">KTV櫃台系統</h1>
            <table style="margin-left: 500px;">
                <tr>
                    <td></td>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">帳號 : </span>
                        <input  name="account" v-model="account" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="請輸入帳號">
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
                    <td align="right"><button type="button" class="btn btn-outline-secondary" @click="login">登入</button></td>
                </tr>
            </table>

</template>
    
<script setup>
    import Swal from 'sweetalert2';
    import { inject, ref } from 'vue'
    import axiosapi from '@/plugins/axios';
    import { useRouter } from 'vue-router';

    const account = ref("")
    const password = ref("")
    const router = useRouter();
    const user = inject('user');
    const setUser = inject('setUser')

    function login() {
        axiosapi.defaults.headers.authorization = "";
        sessionStorage.removeItem("user");
        if ( account.value == '' ) {
            account.value = null
        }
        if ( password.value == '' ) {
            password.value = null
        }

        let request = {
            "account": account.value,
            "password": password.value
        };

        axiosapi.post("/ktv-app/orders/login", request)
        .then(function (response) {
            console.log(response);
            if (response.data.success) {
                console.log("response", response);
                Swal.fire(
                    {
                        icon: "success",
                        text: response.data.message,
                        allowOutsideClick: false
                    }
                ).then(function (result) {
                    if (result.isConfirmed) {
                        axiosapi.defaults.headers.authorization = `Bearer ${response.data.token}`
                        sessionStorage.setItem("user", JSON.stringify(response.data.user));
                        setUser(response.data.user)
                        router.push("/");
                    }
                })
            } else {
                Swal.fire(
                    {
                        icon: "warning",
                        text: response.data.message,
                        allowOutsideClick: false
                    }
                )
            }
        })
        .catch(function (error) {
            Swal.fire(
                {
                    icon: "error",
                    text: "登入失敗：" + error.message
                }
            )
        })
    }
    
    
</script>
    
<style>

    
</style>