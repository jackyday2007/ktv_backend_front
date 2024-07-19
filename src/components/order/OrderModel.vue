<template>
    <div ref="exampleRef" id="exampleModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header" v-show="modelValue.status == '消費中'">
                <h5 class="modal-title">預約訂位</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body, input-group mb-3" >
                <span class="input-group-text" id="inputGroup-sizing-default">訂單編號</span>
                <input type="text" disabled :value="modelValue.orderId" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <input @input="doinput('orderId', $event)" type="hidden" :value="modelValue.orderId">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">顧客編號</span>
                <input
                type="text"
                @input="doinput('customerId', $event)"
                :value="modelValue.customerId"
                :disabled="modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中'"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">會員編號</span>
                <input
                @input="doinput('memberId', $event)"
                :value="modelValue.memberId"
                :disabled="modelValue.status === '取消預約'"
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
            </div>

            <!-- <div class="modal-body, input-group mb-3" v-show="modelValue.status != '' && modelValue.status != '取消預約' && modelValue.status != '消費中'">
                <span class="input-group-text" id="inputGroup-sizing-default">&nbsp;&nbsp;包&nbsp;&nbsp;&nbsp;廂&nbsp;&nbsp;</span>
                <select
                class="form-select"
                id="inputGroupSelect01"
                :value="modelValue.room"
                @input="doinput('room', $event)"
                >
                    <option v-for=" item in rooms" :key="item.roomId">
                    {{ item.roomId }}
                    </option>
                </select>
            </div> -->

            <div class="modal-body, input-group mb-3" v-show="modelValue.status == '消費中'">
                <span class="input-group-text" id="inputGroup-sizing-default">&nbsp;&nbsp;包&nbsp;&nbsp;&nbsp;廂&nbsp;&nbsp;</span>
                <input @input="doinput('room', $event)" type="text"
                :disabled="modelValue.status === '預約' || modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中'"
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
                :disabled="modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中'"
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">消費日期</span>
                <input @input="doinput('orderDate', $event)" type="text"
                :disabled="modelValue.status === '預約' || modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中'"
                :value="modelValue.orderDate"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">歡唱時數</span>
                <input 
                @input="doinput('hours', $event)" 
                :disabled="modelValue.status === '預約' || modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中'"
                :value="modelValue.hours"
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="modal-body, input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">消費時段</span>
                <input 
                @input="doinput('startTime', $event)"
                :disabled="modelValue.status === '預約' || modelValue.status === '取消預約' || modelValue.status === '報到' || modelValue.status === '消費中'"
                :value="modelValue.startTime"
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default">
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
            </div>
            
            <div class="modal-footer" style="display: flex; justify-content: center;">
                <button type="button" class="btn btn-outline-success" @click="emits('orderUpdate')" v-show="modelValue.status == ''">確定預約</button>
                <button type="button" class="btn btn-outline-success" @click="emits('checkIn')" v-show="modelValue.status == '預約' " >報到</button>
                <button type="button" class="btn btn-outline-danger" @click="emits('onCheckIn')" v-show="modelValue.status == '預約' " >取消預約</button>
                <button type="button" class="btn btn-outline-success" @click="emits('inTheRoom')" v-show="modelValue.status == '報到' " >進入包廂</button>
                <button type="button" class="btn btn-outline-danger" @click="emits('onCheckIn')" v-show="modelValue.status == '報到' " >取消預約</button>
                <button type="button" class="btn btn-outline-primary" @click="emits('inTheRoom')" v-show="modelValue.status == '消費中' " >結帳</button>
                <button type="button" class="btn btn-outline-dark" @click="emits('onCheckIn')" v-show="modelValue.status == '消費中' " >點餐</button>
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
    

    // ============== 變數 ==============
    const props = defineProps(["modelValue"]);
    const emits = defineEmits(["orderUpdate", "checkIn", "onCheckIn", "inTheRoom", "update:modelValue"])
    const exampleRef = ref(null);
    const exampleModal = ref(null);
    const rooms = ref([ ]);
    const item = ref({  });

    // =========== 開啟時載入 ===========
    
    onMounted(
        function() {
            exampleModal.value = new bootstrap.Modal(exampleRef.value);
            
        }
    );

    // ============== 功能 ==============

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
    function roomList() {

        let request = {}
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
    
</script>
    
<style>
    
</style>