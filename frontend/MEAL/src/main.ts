import { createApp } from "vue"
import { createRouter, createWebHistory} from "vue-router"
import type { Router } from "vue-router"
import "./App.css"
import App from "./App.vue"
import Home from "./Pages/Home.vue"
import Users from "./Pages/Users.vue"
import PersonalArea from "./Pages/PersonalArea.vue"
import NotFound from "./Pages/NotFound.vue"
import Login from "./Pages/Login.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/Users", component: Users },
    { path: "/PersonalArea", component: PersonalArea },
    { path: "/login", component: Login },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
