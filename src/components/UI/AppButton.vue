<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
    label?: string;
    disabled?: boolean;
    viewStyle?: 'primary' | 'secondary';
}

const emit = defineEmits<{
    (e: 'click'): void;
}>();

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    viewStyle: 'primary'
});

const btnAttrs = computed(() => {
    return {
        disabled: props.disabled,
        class: {
            btn: true,
            [`btn-${props.viewStyle}`]: true
        }
    };
});
</script>

<template>
    <button v-bind="btnAttrs" @click="emit('click')">
        <slot name="label" :value="label">
            <span v-if="label" class="label">{{ label }}</span>
        </slot>
    </button>
</template>

<style scoped lang="scss">
.btn {
    display: flex;
    cursor: pointer;
    overflow: unset;
    align-items: center;
    justify-content: center;

    gap: var(--btn-gap);
    width: var(--btn-width);
    height: var(--btn-height);

    line-height: 20px;
    font-size: var(--btn-font-size);

    padding: var(--btn-pad);
    color: var(--text-primary-inv-color);
    transition: var(--el-transition);
    border-radius: var(--border-radius);

    font-weight: var(--font-weight-medium);
    border: var(--border-width) solid transparent;

    --svg-icon-color: currentColor;
    --svg-icon-width: 15px;
    --svg-icon-height: 15px;

    .label {
        width: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:disabled {
        cursor: default;
        opacity: var(--opacity-disabled);
    }

    &.btn-primary {
        background-color: var(--btn-primary-default);

        &:hover {
            background-color: var(--btn-primary-hover);
        }

        &:disabled {
            background-color: var(--btn-primary-disabled);
        }
    }

    &.btn-secondary {
        color: var(--text-primary-two-color);
        background-color: var(--bg-island-color);
        border: var(--border-width) solid var(--btn-primary-default);

        &:hover {
            color: var(--text-primary-inv-color);
            background-color: var(--btn-primary-hover);
        }

        &:disabled {
            background-color: var(--bg-island-color);

            &:hover {
                color: var(--text-primary-two-color);
            }
        }
    }
}
</style>
