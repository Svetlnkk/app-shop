<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
    placeholder?: string;
    name?: string;
    error?: string | undefined;
    disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
    placeholder: '',
    error: undefined,
    disabled: false
});

const model = defineModel({ required: true });
const emits = defineEmits(['blur', 'change', 'input', 'focus']);

const showPassword = ref(false);

const handleShowPassword = () => {
    if (!props.disabled) showPassword.value = !showPassword.value;
};
</script>

<template>
    <app-text
        v-model="model"
        :name="name"
        :placeholder="placeholder"
        :class="{ invalid: error }"
        :disabled="disabled"
        :type="showPassword && !error ? 'text' : 'password'"
        :error="error"
        @blur="emits('blur', $event)"
        @change="emits('change', $event)"
        @input="emits('input', $event)"
        @focus="emits('focus', $event)"
    >
        <template #iconRight>
            <div
                class="app-text-input__icon-right password"
                @click="handleShowPassword"
                :class="{ password__disabled: disabled, password__invalid: error }"
            >
                <svg-icon :name="showPassword ? 'eye-view' : 'eye'" />
            </div>
        </template>
    </app-text>
</template>

<style scoped lang="scss"></style>
