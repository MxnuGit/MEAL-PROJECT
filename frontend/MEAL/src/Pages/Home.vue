<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue"
import Card from "../components/Card.vue"
import carbonaraImg from "../assets/carbonara.jpg"

async function searchRecipes(q: string) {
  console.log("Query:", q)
}
</script>

<template>
  <div class="home-page">
    <SearchBar placeholder="Cerca una ricetta..." :onSearch="searchRecipes" />
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
