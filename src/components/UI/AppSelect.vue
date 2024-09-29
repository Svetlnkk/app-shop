<script setup lang="ts">
interface IProps {
    selectArray: string[];
}

defineProps<IProps>();
const model = defineModel({ required: true, default: '' });
</script>

<template>
    <div class="app-select">
        <select v-model="model">
            <option v-for="item in selectArray" :key="item" :value="item">
                {{ item }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
.app-select {
    width: 100%;

    select {
        align-items: center;
        background: var(--input-fillied-color);
        border-radius: var(--border-radius);
        padding: var(--input-padding);
        border: 1px solid transparent;
        transition: var(--el-transition);
        line-height: var(--input-line-height);
        color: var(--text-input-color);
        cursor: pointer;
        width: 100%;
    }
}
</style>
