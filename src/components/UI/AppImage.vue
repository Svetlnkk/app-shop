<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';

interface Props {
    src?: string;
    defaultImage?: string;
    lazy?: boolean;
    preview?: boolean;
    fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
}

const props = withDefaults(defineProps<Props>(), {
    fit: 'contain',
    defaultImage: '/images/default.png'
});

const imageLoaded = ref(false);
const openPreview = ref(false);
const imageSrc = ref<string>('');
const imageNode = ref<HTMLImageElement>();

onMounted(() => {
    imageSrc.value = props?.src?.length ? props.src : props.defaultImage;
});

watchEffect(() => {
    if (!imageNode.value) return;
    imageNode.value.src = imageSrc.value;
});

function handleError() {
    if (!imageNode.value) return;

    if (imageNode.value.src?.includes(props.defaultImage)) {
        imageLoaded.value = true;
        return;
    }

    imageSrc.value = props.defaultImage;
}

function handleLoad() {
    imageLoaded.value = true;
}
</script>

<template>
    <picture class="app-image" role="none">
        <div
            :class="{
                'image-placeholder': true,
                'image-placeholder__visible': !imageLoaded
            }"
        />

        <div v-if="preview" class="preview-btn" @click="openPreview = true">
            <svg-icon name="eye" />
        </div>

        <img
            class="image"
            ref="imageNode"
            :loading="props.lazy ? 'lazy' : 'eager'"
            decoding="async"
            @load="handleLoad"
            @error.once="handleError"
        />

        <app-modal v-if="openPreview" close @close="openPreview = false">
            <div class="preview-container">
                <app-image
                    class="preview-container__image"
                    :src="imageSrc"
                    lazy
                    fit="contain"
                />
            </div>
        </app-modal>
    </picture>
</template>

<style lang="scss" scoped>
.app-image {
    display: block;
    position: relative;
}

.app-image,
.image,
.image-placeholder {
    width: inherit;
    height: inherit;
    min-width: inherit;
    min-height: inherit;
    border-radius: inherit;
}

.image {
    overflow: hidden;
    object-fit: v-bind(fit);
    object-position: center;
}

.preview-btn {
    width: inherit;
    height: inherit;
    border-radius: inherit;
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    --svg-icon-width: 26px;
    --svg-icon-height: 26px;
    --svg-icon-color: var(--icon-secondary-inv-color);
}

.preview-container {
    min-width: 100px;
    min-height: 200px;
    margin: auto;

    &__image {
        width: 100%;
        margin: auto;
    }
}

.app-image:hover {
    .preview-btn {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.image-placeholder {
    left: 0;
    bottom: 0;
    opacity: 0;
    z-index: 99;
    overflow: hidden;
    position: absolute;
    visibility: hidden;
    transition: all 0.3s;
    background-color: #dbdbdb;

    &__visible {
        opacity: 1;
        visibility: visible;
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 30%,
            rgba(#fff, 0.3) 70%,
            rgba(#fff, 0)
        );
        animation: shimmer 1s infinite;
        content: '';
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
}
</style>
