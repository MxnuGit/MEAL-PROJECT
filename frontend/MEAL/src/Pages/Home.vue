<script setup lang="ts">
import { ref } from "vue"
import SearchBar from "../components/SearchBar.vue"
import Card from "../components/Card.vue"

const results = ref<any[]>([])

async function searchRecipes(q: string) {
  console.log("Query:", q)
}
</script>

<template>
  <div class="home-page">
    <SearchBar placeholder="Cerca una ricetta..." :onSearch="searchRecipes" />
    <Card
      recipeId="1"
      image="../assets/carbonara.jpg"
      user="Chef Mario"
      difficul="Facile"
      time="0:30"
      title="Spaghetti alla Carbonara"
      dishType="Primo"
      people="4 persone"
      :likes="120"
    />
  </div>
</template>
