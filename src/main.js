// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Pinia 상태 관리
import { createPinia } from 'pinia'

// Vue Router
import router from './router'

// Tailwind CSS
import './assets/tailwind.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')
