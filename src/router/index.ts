import { createRouter, createWebHistory } from 'vue-router';
import dashboardRoutes from '@/modules/dashboard/dashboard.routes';
import basketRoutes from '@/modules/basket/basket.routes';
import loginRoutes from '@/modules/login/login.routes';

import { useUserStore } from '@/store';

const routes = [
    ...loginRoutes,
    ...dashboardRoutes,
    ...basketRoutes,
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        meta: { layout: 'empty' },
        component: () => import('../views/errors/ForbiddenView.vue')
    },
    {
        path: '/not_found',
        name: 'not_found',
        meta: { layout: 'empty' },
        component: () => import('../views/errors/NotFoundView.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'Not Found Another',
        redirect: '/not_found'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to) => {
    try {
        document.title = String(to.meta.title || 'Магазин');

        const userStore = useUserStore();

        if (!to.matched.length) {
            return { name: 'not_found' };
        }

        if (to.name === 'Login' && !userStore.checkLoginUser) return;

        if (to.name === 'Login' && userStore.checkLoginUser) return { name: 'Dashboard' };

        if (userStore.checkLoginUser) return;

        const isServiceUrl = to.name === 'forbidden' || to.name === 'not_found';
        if (!isServiceUrl) sessionStorage.setItem('req-path', to.fullPath);

        return { name: 'Login' };
    } catch {
        //
    }
});

export default router;
