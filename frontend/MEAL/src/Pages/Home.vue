<script setup lang="ts">
  import SearchBar from "../components/SearchBar.vue"
  import Card from "../components/Card.vue"
  import filter from "../assets/filter.png"
  import { ref, computed, onMounted } from "vue"
  import axios from "axios"
  import type { Recipe } from "../types"

  async function fetchAllRecipes() {
    const { data } = await axios.get("/api/recipes")
    recipes.value = Array.isArray(data) ? data : []
    currentIndex.value = 0
    console.log(recipes.value)
  }

  const q = ref("")
  const recipes = ref<Recipe[]>([])
  const currentIndex = ref(0)

  function minutesToHHMM(mins: number) {
    if (!Number.isFinite(mins)) return "—"
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${h}:${String(m).padStart(2, "0")}`
  }

  const currentRecipe = computed<Recipe | undefined>(() => recipes.value[currentIndex.value])

  const currentImage = computed(() => {
    const img: any = currentRecipe.value?.recipe_image
    if (!img) return ""
    if (typeof img === "string") return img
    if (img?.data && Array.isArray(img.data)) {
      const bytes = new Uint8Array(img.data)
      let bin = ""
      for (const b of bytes) {
        const n = Number(b)
        if (!Number.isFinite(n)) continue
        bin += String.fromCodePoint(n)
      }
      return `data:image/jpeg;base64,${btoa(bin)}`
    }

    return ""
  })


  async function searchRecipes(query: string) {
    const s = query.trim()
    if (!s) {
      await fetchAllRecipes()
      return
    }
    
    const {data} = await axios.get("/api/recipe/", {
      params: { search: s },
    })

    recipes.value = Array.isArray(data) ? (data as Recipe[]) : []
    currentIndex.value = 0

    console.log(recipes.value)
  }

  onMounted(() => {
    fetchAllRecipes().catch(console.error)
  })

  function nextRecipe() {
    if (!recipes.value.length) return
    currentIndex.value = (currentIndex.value + 1) % recipes.value.length
  }

  function prevRecipe() {
    if (!recipes.value.length) return
    currentIndex.value =
      (currentIndex.value - 1 + recipes.value.length) % recipes.value.length
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

    <div class="carousel">
      <button
        v-if="currentRecipe"
        class="nav left"
        type="button"
        @click="prevRecipe"
        aria-label="Ricetta precedente"
      >
        ‹
      </button>

      <Card
        v-if="currentRecipe"
        class="card"
        :recipeId="String(currentRecipe.recipe_id)"
        :image="currentImage"
        :user="currentRecipe.USERS_username"
        :difficul="currentRecipe.difficulty"
        :time="minutesToHHMM(currentRecipe.prep_time)"
        :title="currentRecipe.name"
        :dishType="currentRecipe.course"
        :people="currentRecipe.people"
      />

      <div v-else class="alert">Nessuna ricetta corrisponde alla ricerca</div>

      <button
        v-if="currentRecipe"
        class="nav right"
        type="button"
        @click="nextRecipe"
        aria-label="Ricetta successiva"
      >
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: inline-block;
  margin: 7px;
}

.home-page {
  text-align: center;
}

.carousel {
  display: inline-flex;
  align-items: center;
}

.nav {
  border: none;
  background: transparent;
  font-size: 40px;
  cursor: pointer;
  line-height: 1;
  user-select: none;
}

.carousel button{
  color: #fff;
}

.alert{
  color: #fff;
  font-weight: bolder;
  background-color: #b83232;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
}
</style>