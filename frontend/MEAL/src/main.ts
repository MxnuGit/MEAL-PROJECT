import { createApp } from "vue"
import { createRouter, createWebHistory} from "vue-router"
import type { Router } from "vue-router"
import "./App.css"
import App from "./App.vue"
import Home from "./Pages/Home.vue"
import Users from "./Pages/Users.vue"
import PersonalArea from "./Pages/PersonalArea.vue"
import RecipeView from "./Pages/RecipeView.vue"
import NotFound from "./Pages/NotFound.vue"
import Login from "./Pages/Login.vue"
import CreateRecipe from "./Pages/CreateRecipe.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/Users", component: Users },
    { path: "/PersonalArea", component: PersonalArea },
    { path: "/RecipeView", component: RecipeView },
    { path: "/Login", component: Login },
    { path: "/CreareRecipe", component: CreateRecipe },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
