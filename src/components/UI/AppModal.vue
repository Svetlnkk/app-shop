<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';

const overflow_nodes = document.querySelectorAll('html, body, .main-container');

interface IProps {
    close?: boolean;
    banOnClosing?: boolean;
    containerStyle?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    close: false,
    banOnClosing: false,
    containerStyle: ''
});

const emits = defineEmits(['close']);

function closeSelectIfOpen() {
    if (!props.close) {
        const container: HTMLElement | null = document.querySelector('.modal__content');
        if (container) {
            container.style.transform = 'scale(1.05)';
            container.style.transition = 'transform 0.4s ease-in-out';

            container.addEventListener(
                'transitionend',
                () => {
                    container.style.transform = 'scale(1)';
                },
                { once: true }
            );
        }
    } else {
        emits('close');
    }
}

function toggle_page_overflow(display: boolean) {
    overflow_nodes.forEach((node: any) => {
        node.style.overflowY = display ? 'initial' : 'hidden';
        node.style.overflowX = 'clip';
    });
}

onBeforeMount(() => {
    toggle_page_overflow(false);
});

onBeforeUnmount(() => {
    toggle_page_overflow(true);
});
</script>

<template>
    <Teleport to="body">
        <div class="modal__overlay" @click.self="closeSelectIfOpen">
            <div
                class="modal__container"
                @click.self="closeSelectIfOpen"
                :style="containerStyle"
            >
                <div class="modal__content">
                    <slot></slot>
                </div>

                <div class="modal-header" v-if="!banOnClosing">
                    <button class="modal-header__close" @click="emits('close')">
                        <svg-icon name="close" />
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.modal__overlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--bg-overlay-color);
    display: flex;
    overflow-y: auto;
}

.modal__container {
    display: flex;
    width: var(--modal-width);
    margin: 78px auto 78px;
    height: fit-content;
    border-radius: var(--modal-border-radius);
    position: relative;
    transform: scale(1);
    animation-name: modalOpen;
    animation-duration: 0.3s;
    flex-direction: row;
    background: transparent;
    padding: 0;
    gap: 10px;
}

.modal__content {
    width: 100%;
    background: var(--bg-island-color);
    border-radius: var(--modal-border-radius);
    padding: var(--modal-padding);
}

.modal-header {
    display: flex;
    align-items: flex-start;
    height: 32px;

    &__close {
        height: 32px;
        background: #000000;
        border-radius: 6px;
        padding: 9px;
        cursor: pointer;

        --svg-icon-width: var(--modal-svg-size-lb);
        --svg-icon-height: var(--modal-svg-size-lb);
        --svg-icon-color: var(--icon-secondary-inv-color);

        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }
    }
}

@media (min-width: 768px) {
    .modal__overlay {
        padding-block: 78px;
    }

    .modal__container {
        margin: auto;
        height: fit-content;
    }
}

@keyframes modalOpen {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
