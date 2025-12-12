<script setup lang="ts">
import { ref } from "vue"
import SearchBar from "../components/SearchBar.vue"

const results = ref<any[]>([])

async function searchRecipes(q: string) {
  console.log("Query:", q)
}
</script>

<template>
  <div class="home-page">
    <SearchBar placeholder="Cerca una ricetta..." :onSearch="searchRecipes" />
    <h1>{{ results }}</h1>
  </div>
</template>
