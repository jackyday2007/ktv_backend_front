<template>
    <button
    @click="showMenuOffcanvas"
    class="btn btn-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#menuOffcanvas"
    aria-controls="offcanvasRight">點&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;餐</button>

    <div class="offcanvas offcanvas-end"
    tabindex="-1"
    id="menuOffcanvas"
    aria-labelledby="offcanvasRightLabel"
    style="width: 50%;
    background-color: #343a40;">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel" style="color: white; font-size: 2.5rem;">菜單</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="input-group mb-3" style="width: 11.8rem;">
            <span class="input-group-text" id="inputGroup-sizing-default" style="background-color: #343a40; color:white;">編號</span>
            <input :value="orderId" type="text" disabled class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <input :value="orderId" type="hidden" >
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default" style="background-color: #343a40;  color:white">品項</span>
            <select v-model="category" @change="allOrderMenu(0)">
                <option ></option>
                <option >啤酒</option>
                <option >威士忌</option>
                <option >熱飲</option>
                <option >冷飲</option>
                <option >美食</option>
                <option >組合</option>
                <option >點心</option>
            </select>
            <span class="input-group-text" id="inputGroup-sizing-default" style="background-color: #343a40;  color:white">品名</span>
            <input type="text" v-model="itemName" @input="allOrderMenu(0)" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <table class="table table-dark table-sm" >
            <thead>
                <tr>
                    <th>選項</th>
                    <th>品項</th>
                    <th>品名</th>
                    <th>容量</th>
                    <th >價格(新台幣)</th>
                    <th>數量</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for=" item in orderMenus "
                :key="item.itemId"
                >
                    <td><input type="checkbox" class="form-check-input me-1" :value="item.itemId" v-if="item.status == '上架'" @change="updateCheckedItems(item.itemId, $event)" :checked="isChecked(item.itemId)"></td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.itemName }}</td>
                    <td>{{ item.capacity }}</td>
                    <td>{{ item.price }}</td>
                    <td style="width: 17%;"><input type="text" :disabled="!isChecked(item.itemId)" style="width: 30%;" v-model="itemInputs[item.itemId]"></td>
                </tr>
            </tbody>
        </table>
        <div style="display: flex; justify-content: center;">
            <Paginate
                :first-last-button="true"
                first-button-text="&lt;&lt;"
                last-button-text="&gt;&gt;"
                prev-text="&lt;" next-text="&gt;"
                :page-count="pages"
                :initial-page="current"
                v-model="current"
                :click-handler="allOrderMenu"
                :container-class="'pagination'"
                :page-class="'page-item'"
            >
            </Paginate>
        </div>
        <div class="offcanvas-body">
            <div>
                
                <button type="button" class="btn btn-outline-dark" style="color: white;" @click="confirmOrder">確認點餐</button>
                <p style="color: red;" v-show="resultMenu != null" >{{ resultMenu }}</p>
            </div>
        </div>
    </div>
</template>
    
<script setup>

    import Paginate from 'vuejs-paginate-next';
    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'
    import axiosapi from "@/plugins/axios";


    // ============== 變數 ==============
    const props = defineProps([ "orderId","resultMenu", "modelValue"]);
    const emits = defineEmits(["insertOrderDetails", "showMenuOffcanvas", "update:modelValue"]);

    // 分頁
    const total = ref(0);
    const pages = ref(0);
    const orderMenus = ref({})
    const current = ref(0);
    const rows = ref(10);
    const start = ref(0);
    const lastPageRows = ref(0);

    // 搜尋條件
    const category = ref("");
    const itemName = ref("");
    // 在组件的 setup() 中定义复选框状态
    // const checkedItems = ref([]);
    const checkedItems = ref(new Set());
    const itemInputs = ref({})
    const allMenus = ref(new Map());

    const exampleRef = ref(null);
    const exampleModal = ref(null);

    onMounted(() => {
        const menuOffcanvas = new bootstrap.Offcanvas(document.getElementById('menuOffcanvas'));
        allOrderMenu();
        // resetOrderMenu();
    });

    function doinput( key, event ) {
        emits('update:modelValue', {
            ...props.modelValue,
            // [key]: event.target.value
            [key]: event
        })
    }

    // new function
    function confirmOrder() {
        const selectedItems = [...checkedItems.value].map(itemId => {
            const item = allMenus.value.get(itemId) || {};
            return {
                orderId: props.orderId,
                itemName: item.itemName || '',
                price: item.price || 0,
                quantity: itemInputs.value[itemId] || 0
            };
        });
        doinput('checkedItems', [...checkedItems.value]);
        emits('insertOrderDetails', selectedItems);
        // 清空 checkedItems 和 itemInputs
        checkedItems.value.clear();
        itemInputs.value = {};
        hideMenuOffcanvas()
    }

    function updateCheckedItems(itemId, event) {
        if( event.target.checked ) {
            checkedItems.value.add(itemId);
        } else {
            checkedItems.value.delete(itemId);
        }
    }

    function isChecked(itemId) {
        return checkedItems.value.has(itemId);
    }



    // end

    function allOrderMenu(page) {
        if (category.value === "") {
            category.value = null;
        }

        if (itemName.value === "") {
            itemName.value = null;
        }

        //分頁計算
        if( page ) {
            start.value = page -1 ;
            current.value = page;
            
        } else {
            start.value = 0;
            current.value = 1
        }

        let request= {
            "start": start.value,
            "max": rows.value,
            "dir" : false,
            "order" : "itemId",
            "category" : category.value,
            "itemName" : itemName.value
        }
        axiosapi.post("/orderMenu/allMenu", request)
                .then(function(response) {
                    orderMenus.value = response.data.list;
                    total.value = response.data.count;
                    pages.value = Math.ceil( total.value / rows.value );
                    lastPageRows.value = total.value % rows.value;
                    
                    response.data.list.forEach(item => {
                        allMenus.value.set(item.itemId, item)
                    });
                })
                .catch()
    }

    function hideMenuOffcanvas() {
        const menuOffcanvasElement = document.getElementById('menuOffcanvas');
        const menuOffcanvas = bootstrap.Offcanvas.getInstance(menuOffcanvasElement);
        if (menuOffcanvas) {
            menuOffcanvas.hide();
        }
    }
    

</script>
    
<style>

</style>