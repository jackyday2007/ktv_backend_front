<template>
    <div>
    <h3>訂位清單</h3>
    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">訂單編號</span>
        <input v-model="orderId" @input="orderList(0)" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <span class="input-group-text" id="inputGroup-sizing-default">會員編號</span>
        <input v-model="memberId" @input="orderList(0)"  type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <span class="input-group-text" id="inputGroup-sizing-default">包廂號</span>
        <input v-model="roomId" @input="orderList(0)" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <span class="input-group-text" id="inputGroup-sizing-default">消費狀態</span>
        <!-- <input v-model="status" @input="orderList(0)" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"> -->
        <select v-model="status" @change="orderList(0)" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <option>預約</option>
            <option>等待</option>
            <option>入場</option>
            <option>結帳</option>
            <option>離場</option>
        </select>
        <label class="input-group-text" for="inputGroupSelect01">顯視筆數</label>
        <OrdersRows
            :total="total"
            :options="[2, 3, 4, 5, 10]"
            v-model="rows"
            @change="orderList">
        >
        </OrdersRows>
    </div>

    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>訂單編號</th>
                <th>會員編號</th>
                <th>顧客編號</th>
                <th>包廂號</th>
                <th>消費日期</th>
                <th>歡唱時數</th>
                <th>入場時間</th>
                <th>離場時間</th>
                <th>消費金額</th>
                <th>消費狀態</th>
            </tr>
        </thead>
        <tbody>
        <OrdersList
            v-for=" item in orders "
            :key="item.id"
            :order="item"
        >
        </OrdersList>
        </tbody>

    </table>
    <Paginate
        :first-last-button="true"
        first-button-text="&lt;&lt;"
        last-button-text="&gt;&gt;"
        prev-text="&lt;" next-text="&gt;"
        :page-count="pages"
        :initial-page="current"
        v-model="current"
        :click-handler="orderList">
    </Paginate>

    </div>



</template>
    
<script setup>
    import axiosapi from '@/plugins/axios';
    import OrdersList from '@/components/order/OrdersList.vue';
    import { onMounted, ref } from 'vue';
    import Swal from 'sweetalert2';
    import OrdersRows from '@/components/order/OrdersRows.vue'
    import Paginate from 'vuejs-paginate-next';

    onMounted (
        function() {
            orderList()
        }
    )


    // 分頁
    const total = ref(0);
    const pages = ref(0);
    const orders = ref([ ]);
    const current = ref(0);
    const rows = ref(4);
    const start = ref(0);
    const lastPageRows = ref(0);

    // 搜尋條件
    const memberId = ref("");
    const orderId = ref("");
    const roomId = ref("");
    const status = ref("");


    function orderList(page) {
        if (memberId.value === "") {
            memberId.value = null;
        }

        if (orderId.value === "") {
            orderId.value = null;
        }

        if ( status.value === "" ) {
            status.value = null;
        }

        //分頁計算
        if( page ) {
            start.value = ( page -1 ) * rows.value;
            current.value = page;
        } else {
            start.value = 0;
            current.value = 1
        }

        let request = {
            "start": start.value,
            "max": rows.value,
            "dir" : false,
            "order" : "orderId",
            "memberId" : memberId.value,
            "roomId" : roomId.value,
            "orderId" : orderId.value,
            "status" : status.value,
        }

        axiosapi.post("/ktv-app/ktvbackend/orders/findTest", request)
            .then( function( response ) {
                console.log("response = ", response)
                orders.value = response.data.list;
                total.value = response.data.count;
                pages.value = Math.ceil( total.value / rows.value );
                lastPageRows.value = total.value % rows.value;
            } )
            .catch(
                function( error ) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        text: "查詢失敗" + error.message
                    })
                }
            )
    }


    
</script>
    
<style>
    
    tr {
        text-align: center;
    }


</style>