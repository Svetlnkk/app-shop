<script setup lang="ts">
import { computed, ref } from 'vue';

interface IProps {
    placeholder?: string;
    name?: string;
    error?: string | undefined;
    disabled?: boolean;
    mask?: any;
    iconLeft?: string;
    iconRight?: string;
    type?: string;
    customStyle?: string;
}

withDefaults(defineProps<IProps>(), {
    placeholder: '',
    name: '',
    error: undefined,
    disabled: false,
    mask: '',
    iconLeft: '',
    iconRight: 'close',
    type: 'text',
    customStyle: ''
});

const model = defineModel({ required: true, default: '' });
const emits = defineEmits(['blur', 'change', 'input', 'focus']);

const isFocused = ref(false);

const displayReset = computed(() => {
    return model.value.length && isFocused.value;
});

const resetInput = () => {
    model.value = '';
};

const handleFocus = ($event: FocusEvent) => {
    emits('focus', $event);
    isFocused.value = true;
};

const handleBlur = ($event: FocusEvent) => {
    emits('blur', $event);
    isFocused.value = false;
};
</script>

<template>
    <div class="app-input-form">
        <div class="app-text-input">
            <slot name="iconLeft" :value="iconLeft">
                <div class="app-text-input__icon-left" v-if="iconLeft">
                    <svg-icon :name="iconLeft" />
                </div>
            </slot>
            <slot name="input" :value="type">
                <input
                    class="app-input"
                    :type="type"
                    v-model="model"
                    :class="[
                        customStyle,
                        { 'app-input__padding-left': iconLeft, invalid: error }
                    ]"
                    :name="name"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    @blur="handleBlur"
                    @change="emits('change', $event)"
                    @input="emits('input', $event)"
                    @focus="handleFocus($event)"
                />
            </slot>
            <slot name="iconRight" :value="iconRight">
                <div
                    v-if="displayReset"
                    class="app-text-input__icon-right"
                    @mousedown="resetInput"
                    :class="{ disabled: disabled }"
                >
                    <svg-icon :name="iconRight" />
                </div>
            </slot>
        </div>
        <slot name="error" :value="error">
            <span v-if="error">{{ error }}</span>
        </slot>
    </div>
</template>

<style scoped lang="scss"></style>
