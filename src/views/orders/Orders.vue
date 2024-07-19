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
        <select v-model="status" @change="orderList(0)" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <option></option>
            <option>預約</option>
            <option>報到</option>
            <option>消費中</option>
            <option>結帳</option>
            <option>離場</option>
            <option>取消預約</option>
        </select>
        <label class="input-group-text" for="inputGroupSelect01">顯視筆數</label>
        

        <OrdersRows
            :total="total"
            :options="[2, 3, 4, 5, 10]"
            v-model="rows"
            @change="orderList">
        >
        </OrdersRows>
        <button class="btn btn-outline-secondary, btn btn-dark" type="button" id="button-addon1" @click="newOrder">新增訂位</button>
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
            :key="item.orderId"
            :order="item"
            @dblclick="openModal('watting', item.orderId)"
        >
        </OrdersList>
        
        </tbody>
    </table>
    

    </div>
    <div style="display: flex; justify-content: center;">
        <Paginate
            :first-last-button="true"
            first-button-text="&lt;&lt;"
            last-button-text="&gt;&gt;"
            prev-text="&lt;" next-text="&gt;"
            :page-count="pages"
            :initial-page="current"
            v-model="current"
            :click-handler="orderList"
            :container-class="'pagination'"
            :page-class="'page-item'"
        >
        </Paginate>
    </div>

    <OrderModel
        ref="orderModal"
        v-model="order"
        @order-update="modifyOrder"
        @check-in="checkIn"
        @on-check-in="onCheckIn"
        @in-the-room="inTheRoom"
    >
    </OrderModel>
    
</template>
    
<script setup>
    import axiosapi from '@/plugins/axios';
    import OrdersList from '@/components/order/OrdersList.vue';
    import { onMounted, ref } from 'vue';
    import Swal from 'sweetalert2';
    import OrdersRows from '@/components/order/OrdersRows.vue'
    import Paginate from 'vuejs-paginate-next';
    import OrderModel from '@/components/order/OrderModel.vue'
    
    // =========== 開啟時載入 ===========

    onMounted (
        function() {
            orderList()
        }
    )

    // ============== 變數 ==============
    // 分頁
    const total = ref(0);
    const pages = ref(0);
    const orders = ref({ });
    const current = ref(0);
    const rows = ref(4);
    const start = ref(0);
    const lastPageRows = ref(0);

    // 搜尋條件
    const memberId = ref("");
    const orderId = ref("");
    const roomId = ref("");
    const status = ref("");

    //按鈕條件
    const orderModal = ref(null);

    // 存放資料變數
    const order = ref({ });

    console.log("order = " , order);

    // ============== 功能 ==============

    // modal條件
    function openModal(action, id) {
        console.log("openModal.id = ", id)
        if(action==='insert') {
            order.value = { };
            orderModal.value.showModal();
        } else {
            callFindByOrderId(id);
            orderModal.value.showModal();
        }
    }

    // 尋找訂單編號
    function callFindByOrderId( id ) {
        console.log("callFindByOrderId = ", id);
        axiosapi.get(`/ktv-app/ktvbackend/orders/${id}`)
        .then(function(response) {
            console.log("callFindByOrderId.response = ", response);
            console.log("callFindByOrderId.response.list = ", response.data.list);
            order.value = response.data.list[0];
            console.log("response.data.list[0].room = ", response.data.list[0].room)
            console.log("order.value.room = ", order.value.room)
        })
        .catch(function(error) {
            Swal.fire({
                icon: "error",
                text: "查詢失敗" + error.message
            })
        })
    }

    // ============ 新增訂單 =================
    function newOrder() {
        axiosapi.post("/ktv-app/ktvbackend/orders/createOrderId")
        .then(function( response ) {
            console.log("response", response)
            openModal("createOrder",response.data.orderId)
        })
        .catch(
            function( error) {
                Swal.fire({
                    icon: "error",
                    text: "新增失敗" + error.message
                })
            }
        )
    }

    function modifyOrder() {
        if ( order.value.numberOfPersons == "" ) {
            order.value.numberOfPersons = null
        }
        if ( order.value.customerId == "" ) {
            order.value.customerId = null
        }
        if ( order.value.orderDate == "" ) {
            order.value.orderDate = null
        }
        if ( order.value.memberId == "" ) {
            order.value.memberId = null
        }
        if ( order.value.room == "" ) {
            order.value.room = null
        }
        if ( order.value.startTime == "" ) {
            order.value.startTime = null
        }
        if ( order.value.subTotal == "" ) {
            order.value.subTotal = null
        }
        axiosapi.put( `/ktv-app/ktvbackend/orders/newOrder/${order.value.orderId}`, order.value )
        .then(function(response) {
            console.log("modifyOrder.response = ", response);
            if ( response.data.success ) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then(function(result) {
                    orderModal.value.hideModal();
                    orderList(current.value)
                })
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                })
            }
        })
        .catch(function(error){
            Swal.fire({
                icon:"error",
                text:error.message
            })
        })

    }

    // 客戶報到
    function checkIn() {
        console.log("checkIn")
        if ( order.value.customerId == "" ) {
            order.value.customerId = null
        }
        if ( order.value.memberId == "" ) {
            order.value.memberId = null
        }
        if ( order.value.room == "" ) {
            order.value.room = null
        }
        if ( order.value.numberOfPersons == "" ) {
            order.value.numberOfPersons = null
        }
        axiosapi.put( `/ktv-app/ktvbackend/orders/checkIn/${order.value.orderId}`, order.value )
        .then(function(response) {
            console.log("modifyOrder.response = ", response);
            if ( response.data.success ) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then(function(result) {
                    orderModal.value.hideModal();
                    orderList(current.value)
                })
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                })
            }
        })
        .catch(function(error){
            Swal.fire({
                icon:"error",
                text:error.message
            })
        })
    }

    function onCheckIn() {
        console.log("onCheckIn")
        axiosapi.post( `/ktv-app/ktvbackend/orders/noCheckIn/${order.value.orderId}`, order.value )
        .then(function(response) {
            console.log("modifyOrder.response = ", response);
            if ( response.data.success ) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then(function(result) {
                    orderModal.value.hideModal();
                    orderList(current.value)
                })
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                })
            }
        })
        .catch(function(error){
            Swal.fire({
                icon:"error",
                text:error.message
            })
        })
        
    }

    // 進入包廂
    function inTheRoom() {
        console.log("進入包廂")
        if ( order.value.room == "" ) {
            order.value.room = null
        }
        if ( order.value.memberId == "" ) {
            order.value.memberId = null
        }
        axiosapi.put( `/ktv-app/ktvbackend/orders/inTheRoom/${order.value.orderId}`, order.value )
        .then(function(response) {
            console.log("modifyOrder.response = ", response);
            if ( response.data.success ) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then(function(result) {
                    console.log("order.value.result", order.value)
                    orderModal.value.hideModal();
                    orderList(current.value)
                })
            } else {
                console.log("order.value.else", order.value)
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                })
            }
        })
        .catch(function(error){
            console.log("order.value.error", order.value)
            Swal.fire({
                icon:"error",
                text:error.message
            })
        })

    }

    // 搜尋及分頁
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
            start.value = page -1 ;
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

        axiosapi.post("/ktv-app/ktvbackend/orders/find", request)
            .then( function( response ) {
                
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