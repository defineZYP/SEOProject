import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-plus'
import hightlight from 'vue3-highlight'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/style/global.css'

createApp(App).use(store).use(router).use(ElementUI).use(hightlight).mount('#app')
