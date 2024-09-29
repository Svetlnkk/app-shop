<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';

interface IProps {
    name?: string;
    modelValue?: number;
    min?: number;
    max?: number;
    maxFractionDigits?: number;
    allowNull?: boolean;
    error?: string | undefined;
    disabled?: boolean;
    placeholder?: string;
    maxlength?: number;
    offFormated?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
    modelValue: 0,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
    maxFractionDigits: 0,
    allowNull: false,
    error: undefined,
    disabled: false,
    placeholder: '',
    maxlength: Number.MAX_SAFE_INTEGER,
    offFormated: false
});

const emits = defineEmits(['blur', 'update:modelValue', 'enterKeyDown', 'input']);

defineExpose({ focusOnInput });

if (props.maxFractionDigits < 0 || props.maxFractionDigits > 4) {
    throw new Error('Свойство "maxFractionDigits" должно быть в диаппазоне от 0 до 4.');
}

const inputRef = ref<HTMLInputElement>();

const numberFormat = (num: number): string => {
    const s = new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: props.maxFractionDigits
    }).format(num);

    return s;
};

const setValuesFromProps = () => {
    if (inputRef.value) {
        let propsModelValue: any =
            typeof props.modelValue === 'string'
                ? parseFloat(props.modelValue)
                : props.modelValue;

        propsModelValue = isNaN(propsModelValue) ? null : propsModelValue;

        inputRef.value.value =
            !propsModelValue && props.allowNull
                ? ''
                : !props.offFormated
                  ? numberFormat(propsModelValue)
                  : propsModelValue;
    }
};

const handleInput = (event: Event) => {
    const elem = event.target as HTMLInputElement;
    let value = elem.value;
    let negative = false;
    let dot = false;

    emits('input', value);

    value =
        props.min < 0 ? value.replace(/[^0-9,.-]/g, '') : value.replace(/[^0-9,.]/g, '');

    value =
        props.maxFractionDigits === 0
            ? value.replace(/[,.]/g, '')
            : value.replace(/,/g, '.');

    if (value.includes('-')) {
        value = value.replace(/-/g, '');
        negative = true;
    }

    if (value.includes('.')) dot = true;
    if (value.startsWith('0') && value[1] !== '.') value = '0';

    const [integer, ...fractions] = value.split('.');
    const fraction = fractions.join('').slice(0, props.maxFractionDigits);

    let result = '';

    if (negative && !integer) {
        result = '-';
    } else if (integer) {
        result = `${negative ? '-' : ''}${!props.offFormated ? numberFormat(+integer) : +integer}`;
    }

    if (dot) {
        result += fraction === '' ? ',' : `,${fraction}`;
    }

    const num = Number(result.replace(/\s/g, '').replace(/,/g, '.'));
    if (num < props.min && !props.offFormated) result = numberFormat(props.min);
    else if (num > props.max && !props.offFormated) result = numberFormat(props.max);

    const selectionStart = elem.selectionStart;
    const spacesCount = result.replace(/[^\s]/g, '').length;

    elem.value = result;

    if ((selectionStart ?? 0) + spacesCount < result.length) {
        elem.setSelectionRange(selectionStart, selectionStart);
    }
};

const updateModelValue = (value: string) => {
    let _val = value.replace(/\s/g, '').replace(/,/g, '.');
    let _num = parseFloat(_val);
    let _final: number | null;

    if (isNaN(_num)) {
        _final = props.allowNull ? null : 0;
    } else {
        _final = _num;
    }

    emits('update:modelValue', _final);
};

const handleKeydown = (event: KeyboardEvent) => {
    const { altKey, ctrlKey, shiftKey, key } = event;

    if (altKey || ctrlKey || shiftKey) return;

    if (key === 'Enter') {
        updateModelValue((event.target as HTMLInputElement).value);
        emits('enterKeyDown');
    }
};

const handleBlur = (event: Event) => {
    updateModelValue((event.target as HTMLInputElement).value);
    emits('blur');
};

async function focusOnInput() {
    await nextTick();
    if (inputRef.value) inputRef.value.focus();
}

onMounted(() => {
    setValuesFromProps();
});

watch(props, () => {
    setValuesFromProps();
});
</script>

<template>
    <div class="app-input-form">
        <input
            ref="inputRef"
            class="app-input"
            type="text"
            :name="name"
            :class="{ invalid: error }"
            :disabled="disabled"
            @blur="handleBlur"
            @input="handleInput"
            @keydown="handleKeydown"
            inputmode="decimal"
            :placeholder="placeholder"
            :maxlength="maxlength"
        />

        <span v-if="error">{{ error }}</span>
    </div>
</template>

<style scoped lang="scss"></style>
