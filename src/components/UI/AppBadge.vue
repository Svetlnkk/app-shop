<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
    value?: number | string;
    absolute?: boolean;
}

const props = defineProps<IProps>();

const badgeValue = computed(() => props.value ?? '');
const badgeClasses = computed(() => {
    return {
        'app-badge': true,
        'app-badge__absolute': props.absolute
    };
});
</script>

<template>
    <span :class="badgeClasses"> {{ badgeValue }} </span>
</template>

<style scoped lang="scss">
.app-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    pointer-events: auto;
    white-space: nowrap;
    text-indent: 0;

    padding: var(--badge-padding);
    font-size: var(--badge-font-size);
    font-weight: var(--badge-font-weight);
    border-radius: var(--badge-border-radius);

    height: var(--badge-size);
    min-width: var(--badge-size);

    background: var(--btn-primary-default);
    color: var(--text-primary-inv-color);

    &__absolute {
        left: 23px;
        top: -5px;
        z-index: 1;
        position: absolute;
    }
}
</style>
