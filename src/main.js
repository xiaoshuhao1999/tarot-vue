import { createApp } from 'vue';
import './style.css';
import './assets/css/animate.min.css';
// import 'amfe-flexible/index.js'
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
