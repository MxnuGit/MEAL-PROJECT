<script setup lang="ts">
import { ref } from "vue"

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
            <img src="./assets/home-icon.png" alt="" />
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
          <router-link to="/PersonalArea">
            <img src="./assets/person.png" alt="" />
            <p>Area Personale</p>
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/CreateRecipe">
            <img src="./assets/login.png" alt="" />
            <p>Crea una Ricetta</p>
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/Login">
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
