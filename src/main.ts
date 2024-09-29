import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import useComponents from './components/index.js';
import 'virtual:svg-icons-register';

import './styles/style.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

useComponents(app);

app.mount('#app');
