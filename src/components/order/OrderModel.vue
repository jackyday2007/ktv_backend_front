<template>
    <div ref="exampleRef" id="exampleModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header" v-show="modelValue.status != '消費中'">
                    <h5 class="modal-title">預約訂位</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-header" v-show="modelValue.status === '消費中'">
                    <h5 class="modal-title">消費資訊</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.status != ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">訂單編號</span>
                    <input type="text" disabled :value="modelValue.orderId" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <input @input="doinput('orderId', $event)" :value="modelValue.orderId" type="hidden">
                </div>

                <div class="modal-body, input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">顧客編號</span>
                    <input
                    type="text"
                    :value="modelValue.customerId"
                    disabled
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                    <input type="hidden" @input="doinput('customerId', $event)" :value="modelValue.customerId">
                    <CustomerCheck
                    v-if=" modelValue.status != '取消預約' && !modelValue.memberId && !modelValue.customerId"
                    ref="customerModal"
                    v-model="customer"
                    :result="result"
                    @customer-insert="insertCustomer"
                    @check-customer-id = "checkCustomerId"
                    @show-customer-offcanvas="showCustomerOffcanvas"
                    >
                    </CustomerCheck>
                </div>

                <div class="modal-body, input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">會員編號</span>
                    <input
                    disabled
                    :value="modelValue.memberId"
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                    <input @input="doinput('memberId', $event)" :value="modelValue.memberId" type="hidden">
                    <MemberCheck
                    v-if= "modelValue.status != '取消預約' && modelValue.status != '已結帳' && !modelValue.memberId || modelValue.memberId == '' && modelValue.memberId == null"
                    ref="memberModal"
                    v-model="member"
                    :memberresult="memberResult"
                    @check-member-phone="checkMemberId"
                    @show-member-offcanvas="showMemberOffcanvas"
                    >
                    </MemberCheck>
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.status !== '消費中' && modelValue.status !== '' && modelValue.status !== '取消預約' && modelValue.status !== '已結帳'">
                    <span class="input-group-text" id="inputGroup-sizing-default">包&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;廂</span>
                    <select
                    class="form-select"
                    id="inputGroupSelect01"
                    :value="modelValue.room"
                    @input="doinput('room', $event)"
                    >
                        <option></option>
                        <option v-for=" item in rooms" :key="item.roomId" v-show="item.status === '開放中'">
                        {{ item.roomId }}
                        </option>
                    </select>
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.room !=='' && modelValue.status !=='預約' && modelValue.status !=='報到'">
                    <span class="input-group-text" id="inputGroup-sizing-default">包&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;廂</span>
                    <input @input="doinput('room', $event)" type="text"
                    disabled
                    :value="modelValue.room"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                </div>

                <div class="modal-body, input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">消費人數</span>
                    <input
                    @input="doinput('numberOfPersons', $event)"
                    :value="modelValue.numberOfPersons"
                    :disabled="modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中' || modelValue.status === '已結帳'"
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                </div>

                <div class="modal-body, input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">消費日期</span>
                    <input @input="doinput('orderDate', $event)" type="date"
                    :disabled="modelValue.status === '預約' || modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中' || modelValue.status === '已結帳'"
                    :value="modelValue.orderDate"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                </div>

                <div class="modal-body, input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">歡唱時數</span>
                    <select
                    @input="doinput('hours', $event)" 
                    :disabled="modelValue.status === '預約' || modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中' || modelValue.status === '已結帳'"
                    :value="modelValue.hours"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                    >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.status != ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">消費時段</span>
                    <input 
                    disabled
                    :value="modelValue.startTime"
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.status == ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">消費時段</span>
                    <select
                    class="form-select"
                    id="inputGroupSelect01"
                    :value="modelValue.startTime"
                    @input="doinput('startTime', $event)"
                    >
                        <option></option>
                        <option v-for=" item in timeSolt" :key="item.startTime">
                        {{ item.startTime }}
                        </option>
                    </select>
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.status != ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">離場時間</span>
                    <input
                    :value="modelValue.endTime"
                    type="text"
                    disabled
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.status != ''">
                    <span class="input-group-text" id="inputGroup-sizing-default">消費狀態</span>
                    <input
                    :value="modelValue.status"
                    type="text" disabled
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                    <OrderMenu
                    v-if="modelValue.status == '消費中'"
                    ref="menuModal"
                    v-model="orderMenu"
                    :order-id="modelValue.orderId"
                    :result-menu="orderMenuResult"
                    @show-menu-offcanvas="showMenuOffcanvas"
                    @insert-order-details = "insertOrderDetails"
                    ></OrderMenu>
                </div>

                <div class="modal-body, input-group mb-3" v-show="modelValue.status != '' && modelValue.status != '預約' && modelValue.status != '報到' && modelValue.status != '取消預約'">
                    <span class="input-group-text" id="inputGroup-sizing-default">消費金額</span>
                    <input
                    :value="modelValue.subTotal"
                    type="text"
                    disabled
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default">
                    <ConsumerDetails
                        v-if="modelValue.status == '消費中'"
                        :order-id="modelValue.orderId"
                        @consumer-offcanvas="consumerDetailsOffcanvas"
                    >
                    </ConsumerDetails>
                    <CheckoutMsg
                        v-if="modelValue.status == '已結帳'"
                        :order-id="modelValue.orderId"
                        :room="modelValue.room"
                        @checkout-msg-offcanvas="showCheckoutMsgOffcanvas"
                    >
                    </CheckoutMsg>
                </div>
                
                <div class="modal-footer" style="display: flex; justify-content: center;">
                    <button type="button" class="btn btn-outline-success" @click="emits('orderUpdate')" v-show="modelValue.orderId == '' ">確定預約</button>
                    <button type="button" class="btn btn-outline-success" @click="emits('checkIn')" v-show="modelValue.status == '預約' " >報到</button>
                    <button type="button" class="btn btn-outline-danger" @click="emits('onCheckIn')" v-show="modelValue.status == '預約' " >取消預約</button>
                    <button type="button" class="btn btn-outline-success" @click="emits('inTheRoom')" v-show="modelValue.status == '報到' " >進入包廂</button>
                    <button type="button" class="btn btn-outline-danger" @click="emits('onCheckIn')" v-show="modelValue.status == '報到' " >取消預約</button>
                    <Checkout
                    v-model="checkouts"
                    v-if="modelValue.status == '消費中'"
                    @checkout-offcanvas="showCheckoutOffcanvas"
                    :order-id="modelValue.orderId"
                    @checkout-post="checkout"
                    :room="modelValue.room"
                    ></Checkout>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">關閉</button>
                </div>
            </div>
            

        </div>
    </div>
        
</template>
    
<script setup>
    
    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'
    import axiosapi from "@/plugins/axios";
    import Swal from "sweetalert2";
    import CustomerCheck from "@/components/customer/CustomerCheck.vue";
    import MemberCheck from "@/components/members/memberCheck.vue";
    import OrderMenu from "@/components/menu/orderMenu.vue"
    import ConsumerDetails from "@/components/menu/ConsumerDetails.vue";
    import Checkout from "@/components/checkout/Checkout.vue";
    import CheckoutMsg from "@/components/checkout/CheckoutMsg.vue";
    
    // ============== 變數 ==============
    const props = defineProps(["modelValue"]);
    const emits = defineEmits(["orderUpdate", "checkIn", "onCheckIn", "inTheRoom", "update:modelValue"])
    const exampleRef = ref(null);
    const exampleModal = ref(null);
    const rooms = ref([ ]);
    const item = ref({  });
    const customerModal = ref(null)
    const customer = ref({ })
    const result = ref()
    const memberModal = ref(null)
    const member = ref({ })
    const memberResult = ref()
    const timeSolt = ref([]);
    const memberOffcanvas = ref(null)
    const menuOffcanvas = ref(null)
    const consumerOffcanvas = ref(null)
    const checkoutOffcanvas = ref(null)
    const checkoutMsgOffcanvas = ref(null)
    const menuModal = ref(null)
    const orderMenu = ref([{ }])
    const orderMenuResult = ref()
    const checkouts = ref({ })
    // =========== 開啟時載入 ===========
    
    onMounted(
        function() {
            exampleModal.value = new bootstrap.Modal(exampleRef.value);
            roomList();
            timeList();
        }
    );

    // ============== 功能 ==============

    function showCustomerOffcanvas() {
        const customerOffcanvas = new bootstrap.Offcanvas(document.getElementById('customerOffcanvas'));
        customerOffcanvas.show();
    }

    function showMemberOffcanvas() {
        memberOffcanvas = new bootstrap.Offcanvas(document.getElementById('memberOffcanvas'));
        memberOffcanvas.show();
    }

    function showMenuOffcanvas() {
        menuOffcanvas = new bootstrap.Offcanvas(document.getElementById('menuOffcanvas'));
        menuOffcanvas.show();
    }

    function consumerDetailsOffcanvas() {
        consumerOffcanvas = new bootstrap.Offcanvas(document.getElementById('consumerDetailsOffcanvas'));
        consumerOffcanvas.show();
    }

    function showCheckoutOffcanvas() {
        checkoutOffcanvas = new bootstrap.Offcanvas(document.getElementById('checkoutOffcanvas'));
        checkoutOffcanvas.show();
    }

    function showCheckoutMsgOffcanvas() {
        checkoutMsgOffcanvas = new bootstrap.Offcanvas(document.getElementById('checkoutMsgOffcanvas'));
        checkoutMsgOffcanvas.show();
    }


    function doinput(key, event) {
        emits('update:modelValue', {
            ...props.modelValue,
            [key]: event.target.value
        });
    }




    function showModal() {
        exampleModal.value.show();
    }
    function hideModal() {
        exampleModal.value.hide();
    }

    defineExpose({
        showModal, hideModal,
    });

    // ============ 方法 ============

    function timeList() {
        let request = {}
        axiosapi.post("/ktv-app/timeSlot/allTime", request)
            .then( function(response) {
                timeSolt.value = response.data.list
            })
            .catch(function(error) {
                console.log("error", error.message)
            })

    }

    function roomList() {
        let request = {
            "max" : 100
        }
        axiosapi.post("/ktv-app/rooms/findAll", request)
            .then( function( response ) {
                console.log("room.response = ", response);
                rooms.value = response.data.list;
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

    function insertCustomer() {

        if ( customer.value.idNumber == '' ) {
            customer.value.idNumber = null;
        }

        if ( customer.value.name == '' ) {
            customer.value.name = null;
        }

        if ( customer.value.birth == '' ) {
            customer.value.birth = null;
        }

        if ( customer.value.phone == '' ) {
            customer.value.phone = null;
        }

        axiosapi.post("/ktv-app/customer/insert", customer.value)
                .then(function(response) {
                    result.value = response.data.message;
                    if ( response.data.message == '請輸入姓名' ) {
                        result.value = response.data.message;
                    } else {
                        if ( response.data.message == '請輸入生日' ) {
                            result.value = response.data.message;
                        } else {
                            if ( response.data.message == '請輸入電話號碼' ) {
                                result.value = response.data.message;
                            } else {
                                checkCustomerId(customer.value.idNumber)
                            }
                        }
                    }
                    
                })
                .catch(function( error ) {
                    result.value = error.message
                })
    }

    function checkCustomerId() {
        if (customer.value.idNumber == '') {
            customer.value.idNumber = null;
        }
        if ( customer.value.idNumber != null ) {
            console.log("查詢")
            console.log("OrderModal.idNumber = ", customer.value.idNumber)
            axiosapi(`/ktv-app/customer/${customer.value.idNumber}`)
                .then(function(response) {
                    if ( response.data != null ) {
                        if ( response.data.list && response.data.list.length > 0 ) {
                            console.log("checkCustomerId", response.data)
                            result.value = response.data.message
                            customer.value = response.data.list[0]
                            emits("update:modelValue", {
                                ...props.modelValue,
                                customerId : response.data.list[0].customerId
                            })
                            customer.value = ''
                            result.value = ''
                        } else {
                            result.value = response.data.message
                        }
                    }
                })
                .catch(function( error ) {
                        console.log(error.message)
                    })
        } else {
            result.value = "請輸入身分證字號"
        }
    }

    function checkMemberId() {
        if ( member.value.phone != '' ) {
            console.log("查詢")
            console.log("OrderModal.phone = ", member.value)
            axiosapi(`/ktv-app/api/members/findWithPhone/${member.value.phone}`)
                .then(function(response) {
                    if ( response.data != null ) {
                        if ( response.data.list && response.data.list.length > 0 ) {
                            console.log("checkCustomerId", response.data)
                            memberResult.value = response.data.message
                            member.value = response.data.list[0]
                            emits("update:modelValue", {
                                ...props.modelValue,
                                memberId : response.data.list[0].memberId
                            })
                            memberResult.value = ''
                            member.value = ''
                        } else {
                            result.value = response.data.message
                            console.log("response.data.else", response.data)
                            console.log("response.data.else", response.data.message)
                        }
                    }
                })
                .catch(function( error ) {
                        console.log(error.message)
                    })
        } else {
            result.value = "請輸入電話號碼"
        }
    }

    function insertOrderDetails(checkedItems) {
        console.log("checkedItems = ", checkedItems)
        axiosapi.post("/ktv-app/orderDetail/new", checkedItems)
                .then(function(response) {
                    orderMenuResult.value = response.data.message;
                    console.log("response", response.data.message)
                    window.location.reload();
                })
                .catch(function( error ) {
                    console.log("error.message", error.message)
                    
                })
    }

    function checkout() {
        if ( checkouts.value.pay == '' ) {
            checkouts.value.pay = null
        }
        console.log("checkouts", checkouts.value);
        axiosapi.post("/ktv-app/checkout", checkouts.value)
                .then(function(response) {
                    console.log("response.checkout",response.data.message);
                    if ( response.data.success ) {
                        Swal.fire({
                            icon: 'success',
                            text: response.data.message
                        }).then(function(result) {
                            window.location.reload();
                        })
                    }
                })
                .catch(function(error) {
                    console.log("response.checkout.err",error.message);
                })
    }

    
</script>
    
<style>
    
</style>