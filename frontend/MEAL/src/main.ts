import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import type { Router } from 'vue-router'

import App from './App.vue'

const ROUTER: Router = createRouter({
    history: createWebHistory(),
    routes: [
        
    ]
})

createApp(App)
    .use(ROUTER)
    .mount('#app')
