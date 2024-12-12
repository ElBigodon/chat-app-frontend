import '@/assets/base.css'
import '@/assets/twc.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/config/laravel-echo'

const app = createApp(App)

app.use(router)

app.mount('#app')