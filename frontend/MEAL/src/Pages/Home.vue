<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue"
import Card from "../components/Card.vue"
import carbonaraImg from "../assets/carbonara.jpg"
import filter from "../assets/filter.png"
import { ref, computed, onMounted } from "vue"
import axios from "axios"

type Recipe = {
  USERS_username: string
  course: string
  people: string
  description: string
  difficulty: string
  isGlutenFree: number
  isLactoseFree: number
  isProteinRich: number
  isVegan: number
  name: string
  prep_time: number
  recipe_id: number | string
  recipe_image?: { type: "Buffer"; data: number[] } | string | null
}

const q = ref("")
const recipes = ref<Recipe[]>([])
const currentIndex = ref(0)

const currentRecipe = computed(() => recipes.value[currentIndex.value] ?? null)

const DEFAULT_MIME = "image/jpeg"

function minutesToHHMM(mins: number) {
  if (!Number.isFinite(mins)) return "—"
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}:${String(m).padStart(2, "0")}`
}

function bufferToDataUrl(
  bufObj: Recipe["recipe_image"],
  mime = DEFAULT_MIME
): string | null {
  if (!bufObj) return null
  if (typeof bufObj === "string") return bufObj
  const data = (bufObj as any)?.data
  if (!Array.isArray(data)) return null

  const bytes = new Uint8Array(data)
  const chunkSize = 0x8000
  let binary = ""
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }

  return `data:${mime};base64,${btoa(binary)}`
}

const currentImage = computed(() => {
  const img = currentRecipe.value?.recipe_image ?? null
  return bufferToDataUrl(img) ?? carbonaraImg
})

async function fetchLatestRecipes() {
  try {
    const { data } = await axios.get("/api/recipe/")
    const arr = Array.isArray(data) ? (data as Recipe[]) : []
    arr.sort((a, b) => Number(b.recipe_id) - Number(a.recipe_id))

    recipes.value = arr.slice(0, 10)
    currentIndex.value = 0
  } catch (e) {
    console.error("Errore caricamento ultime ricette:", e)
    recipes.value = []
    currentIndex.value = 0
  }
}

onMounted(() => {
  fetchLatestRecipes()
})

async function searchRecipes(query: string) {
  const s = query.trim()
  if (!s) {
    await fetchLatestRecipes()
    return
  }

  const { data } = await axios.get("/api/recipe/", {
    params: { search: s },
  })

  recipes.value = Array.isArray(data) ? (data as Recipe[]) : []
  currentIndex.value = 0

  console.log(recipes.value)
}

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

    <div v-if="currentRecipe" class="carousel">
      <button
        v-if="recipes.length > 1"
        class="nav left"
        type="button"
        @click="prevRecipe"
        aria-label="Ricetta precedente"
      >
        ‹
      </button>

      <Card
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

      <button
        v-if="recipes.length > 1"
        class="nav right"
        type="button"
        @click="nextRecipe"
        aria-label="Ricetta successiva"
      >
        ›
      </button>
    </div>

    <Card
      v-else
      recipeId="1"
      :image="carbonaraImg"
      user="chef Mario"
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

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.nav {
  border: none;
  background: transparent;
  font-size: 40px;
  cursor: pointer;
  padding: 0 10px;
  line-height: 1;
  user-select: none;
}

.carousel button {
  color: #fff;
}
</style>
