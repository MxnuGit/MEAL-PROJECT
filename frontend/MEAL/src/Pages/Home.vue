<script setup lang="ts">
  import SearchBar from "../components/SearchBar.vue"
  import Card from "../components/Card.vue"
  import carbonaraImg from "../assets/carbonara.jpg"
  import filter from "../assets/filter.png"
  import { ref } from "vue"
  import axios from "axios"

  const q = ref("") //variabile reattiva per la query di ricerca

  async function searchRecipes(query: string) { //funzione per cercare le ricette
      const s = query.trim() //rimuove spazi bianchi all'inizio e alla fine
      if (!s) { //se la stringa è vuota
          console.log("non trovato") //logga "non trovato"
          return //esce dalla funzione
      }

      const { data } = await axios.get("/api/recipe/" + s ) //chiamata axios per ottenere le ricette

      console.log(data) //logga i dati ricevuti
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
