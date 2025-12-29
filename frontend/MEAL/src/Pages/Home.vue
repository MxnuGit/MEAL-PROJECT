<script setup lang="ts">
  import SearchBar from "../components/SearchBar.vue"
  import Card from "../components/Card.vue"
  import carbonaraImg from "../assets/carbonara.jpg"
  import filter from "../assets/filter.png"
  import { ref } from "vue"

  const q = ref("")

  function searchRecipes(query: string) {
    console.log("API ricette:", query)
  }

  function openFilters(currentQuery: string) {
    console.log("Apro filtri con query:", currentQuery)
  }
</script>

<template>
  <div class="home-page">
    <SearchBar
      v-model="q"
      placeholder="Cerca una ricetta..."
      @query="searchRecipes"
      @action="openFilters"
      :icon="filter"
      buttonAriaLabel="Filtri"
    />
    <Card
      recipeId="1"
      :image="carbonaraImg"
      user="Chef Mario"
      difficul="Facile"
      time="0:30"
      title="Spaghetti alla Carbonara"
      dishType="Primo"
      people="4 persone"
      class="card"
    />
  </div>
</template>

<style scoped>
  .card {
    display: inline-block;
    margin: 20px;
  }
  .home-page {
    text-align: center;
  }
</style>
