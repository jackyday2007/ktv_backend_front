<template>
    <tr>
        <td>{{ problem.problemId }}</td>
        <td>{{ problem.eventCase }}</td>
        <td v-show="!problem.room">{{ problem.roomId }}</td>
        <td v-show="problem.room">{{ problem.room }}</td>
        <td>{{ problem.content }}</td>
        <td>{{ problem.eventDate }}</td>
        <td>{{ problem.closeDate }}</td>
        <td>
            <span :class="{'text-danger': problem.status === '結案'}">
                {{ problem.status }}
            </span>
        </td>
        <td>
            <!-- 使用 v-if 來隱藏按鈕 -->
            <button 
                v-if="problem.status !== '結案'"
                type="button" 
                :class="['btn', 'btn-outline-dark']"
                @click="handleUpdate"
            >
                修改
            </button>
        </td>
    </tr>
</template>

<script setup>
const props = defineProps(["problem"]);
const emits = defineEmits(["problemUpdate"]);

function handleUpdate() {
    if (props.problem.status !== '結案') {
        emits('problemUpdate', props.problem.problemId);
    }
}
</script>

<style>
td {
    text-align: center;
}

/* 自定義的紅色文字透明底按鈕樣式 */
.btn-closed {
    background-color: transparent; /* 透明背景 */
    color: #dc3545; /* 紅色文字 */
    border: 1px solid #dc3545; /* 紅色邊框 */
}

.btn-closed:disabled {
    color: #f5c6cb; /* 禁用狀態的紅色文字 */
    border-color: #f5c6cb; /* 禁用狀態的紅色邊框 */
}
</style>
