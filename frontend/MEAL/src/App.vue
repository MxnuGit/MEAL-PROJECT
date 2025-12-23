<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios";
import type { User } from "./types";

const user = ref<User | null>(null)

async function getUser() {
  const res = await axios.get("/api/auth/profile")
  user.value = res.data
}

onMounted(() => {
  getUser()
})

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

function onSidebarClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target) return
  if (target.closest("a")) closeSidebar()
}
</script>

<template>
  <button
    class="sidebar-toggle"
    type="button"
    @click="toggleSidebar"
    :aria-label="sidebarOpen ? 'Chiudi menu' : 'Apri menu'"
  >
    {{ sidebarOpen ? "✕" : "☰" }}
  </button>

  <div
    class="sidebar-overlay"
    v-show="sidebarOpen"
    @click="closeSidebar"
  ></div>

  <aside :class="{ open: sidebarOpen }" @click="onSidebarClick">
    <section id="imgSec">
      <router-link to="/">
        <img src="./assets/logo.png" alt="home" />
      </router-link>
    </section>
    <hr />
    <section>
      <ul>
        <li>
          <router-link to="/">
            <img src="./assets/home.png" alt=""/>
            <p>Home</p>
          </router-link>
        </li>
        <li>
          <router-link to="/Users">
            <img src="./assets/Chef-hat.png" alt="" />
            <p>Trova lo Chef</p>
          </router-link>
        </li>
      </ul>
    </section>
    <hr />
    <section>
      <ul>
        <li>
          <router-link to="/PersonalArea" v-if="user">
            <img src="./assets/person.png" alt="" />
            <p>Area Personale</p>
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/CreateRecipe" v-if="user">
            <img src="./assets/plus.png" alt="" />
            <p>Crea una Ricetta</p>
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/Login" v-if="!user">
            <img src="./assets/login.png" alt="" />
            <p>Login</p>
          </router-link>
        </li>
      </ul>
    </section>
  </aside>
  <main>
    <router-view />
  </main>
</template>
