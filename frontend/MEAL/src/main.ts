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
import UserProfile from "./Pages/UserProfile.vue"
import axios from "axios"
import type { User } from "./types"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/Users", component: Users },
    { path: "/UserProfile/:username", component: UserProfile},
    { path: "/PersonalArea", component: PersonalArea, meta: { requireLogin: true } },
    { path: "/RecipeView", component: RecipeView },
    { path: "/Login", component: Login, meta: { requireLogout: true } },
    { path: "/CreateRecipe", component: CreateRecipe, meta: { requireLogin: true } },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

router.beforeEach(async (to) => {
  let user: User | null = null

  try {
    const res = await axios.get("/api/auth/profile")
    user = res.data
  } catch (err) {
    // backend offline → user rimane null
  }

  if (to.meta.requireLogin && !user) {
    return { path: "/login" }
  }

  if (to.meta.requireLogout && user) {
    return { path: "/" }
  }
})

createApp(App)
  .use(router)
  .mount("#app")
