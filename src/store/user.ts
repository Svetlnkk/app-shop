import { defineStore } from 'pinia';
import { computed } from 'vue';

import type { IUser } from '@/modules/login/login.types';

export const useUserStore = defineStore('user', () => {
    const login = (value: IUser) => {
        localStorage.setItem('login', JSON.stringify(value));
    };

    const checkLoginUser = computed(() => {
        return localStorage.getItem('login');
    });

    return {
        checkLoginUser,

        login
    };
});
