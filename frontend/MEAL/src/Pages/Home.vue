<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue"
import Card from "../components/Card.vue"
import filter from "../assets/filter.png"
import { ref, onMounted, proxyRefs  } from "vue"
import axios from "axios"
import type { Recipe, Filters, PrepTimeFilter } from "../types"
import { useRecipeCarousel } from "../composable/useRecipeCarousel"

const q = ref("")
const s = ref("")

const nameCarouselRaw = useRecipeCarousel()
const ingCarouselRaw = useRecipeCarousel()
const nameCarousel = proxyRefs(nameCarouselRaw)
const ingCarousel = proxyRefs(ingCarouselRaw)

const allRecipes = ref<Recipe[]>([])

const baseRecipesName = ref<Recipe[]>([])
const baseRecipesIng = ref<Recipe[]>([])

const defaultFilters: Filters = {
  course: null,
  difficulty: null,
  peopleMin: 0,
  prepTime: null,
}

const showFiltersModal = ref(false)
const appliedFilters = ref<Filters>({ ...defaultFilters })
const draftFilters = ref<Filters>({ ...defaultFilters })

const courseOptions = ["Antipasto", "Primo", "Secondo", "Dolce"]
const difficultyOptions = ["Facile", "Media", "Difficile"]
const prepTimeOptions: Array<{ label: string; value: Exclude<PrepTimeFilter, null> }> = [
  { label: "≤ 15 min", value: "<=15" },
  { label: "≤ 30 min", value: "<=30" },
  { label: "≤ 1 h", value: "<=60" },
  { label: "> 1 h", value: ">60" },
]

function minutesToHHMM(mins: number) {
  if (!Number.isFinite(mins)) return "—"
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}:${String(m).padStart(2, "0")}`
}

function normalizeString(v: unknown) {
  return String(v ?? "").trim().toLowerCase()
}

function parsePeopleCount(people: unknown): number {
  const m = String(people ?? "").match(/\d+/)
  return m ? Number(m[0]) : 0
}

function hasActiveFilters(f: Filters): boolean {
  return Boolean(f.course || f.difficulty || f.prepTime || f.peopleMin > 0)
}

function recipeMatchesFilters(recipe: Recipe, f: Filters): boolean {
  if (f.course && normalizeString(recipe.course) !== normalizeString(f.course)) return false
  if (f.difficulty && normalizeString(recipe.difficulty) !== normalizeString(f.difficulty)) return false
  if (f.peopleMin > 0 && parsePeopleCount(recipe.people) < f.peopleMin) return false

  if (!f.prepTime) return true

  const t = Number(recipe.prep_time)
  if (!Number.isFinite(t)) return false

  switch (f.prepTime) {
    case "<=15":
      return t <= 15
    case "<=30":
      return t <= 30
    case "<=60":
      return t <= 60
    case ">60":
      return t > 60
    default:
      return true
  }
}

function applyFiltersToCarousel(target: ReturnType<typeof useRecipeCarousel>, base: Recipe[]) {
  if (!hasActiveFilters(appliedFilters.value)) {
    target.setRecipes(base)
    return
  }
  target.setRecipes(base.filter((r) => recipeMatchesFilters(r, appliedFilters.value)))
}

function coerceRecipeArray(data: any): Recipe[] {
  return Array.isArray(data) ? (data as Recipe[]) : []
}

async function fetchAllRecipes() {
  const { data } = await axios.get("/api/recipes")
  allRecipes.value = coerceRecipeArray(data)

  baseRecipesName.value = allRecipes.value
  baseRecipesIng.value = allRecipes.value

  applyFiltersToCarousel(nameCarouselRaw, baseRecipesName.value)
  applyFiltersToCarousel(ingCarouselRaw, baseRecipesIng.value)
}

async function searchRecipes(query: string) {
  const term = query.trim()
  if (!term) {
    baseRecipesName.value = allRecipes.value
    applyFiltersToCarousel(nameCarouselRaw, baseRecipesName.value)
    return
  }

  const { data } = await axios.get("/api/recipe/", { params: { search: term } })
  baseRecipesName.value = coerceRecipeArray(data)
  applyFiltersToCarousel(nameCarouselRaw, baseRecipesName.value)
}

async function searchByIngredients(ingredients: string) {
  const term = ingredients.trim()
  if (!term) {
    baseRecipesIng.value = allRecipes.value
    applyFiltersToCarousel(ingCarouselRaw, baseRecipesIng.value)
    return
  }

  const { data } = await axios.get("/api/recipe/searchByIngredients/", {
    params: { search: term },
  })

  baseRecipesIng.value = coerceRecipeArray(data)
  applyFiltersToCarousel(ingCarouselRaw, baseRecipesIng.value)
}

function closeFilters() {
  showFiltersModal.value = false
}

function resetDraftFilters() {
  draftFilters.value = { ...defaultFilters }
}

function confirmFilters() {
  appliedFilters.value = { ...draftFilters.value }
  showFiltersModal.value = false

  applyFiltersToCarousel(nameCarouselRaw, baseRecipesName.value)
  applyFiltersToCarousel(ingCarouselRaw, baseRecipesIng.value)
}

function openFilters() {
  draftFilters.value = { ...appliedFilters.value }
  showFiltersModal.value = true
}

onMounted(() => {
  fetchAllRecipes().catch(console.error)
})
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

    <div v-if="showFiltersModal" class="filters-overlay" @click="closeFilters">
      <div class="filters-modal" @click.stop>
        <div class="filters-header">
          <h2 class="filters-title">Filtri</h2>
          <button class="filters-x" type="button" @click="closeFilters" aria-label="Chiudi">
            ×
          </button>
        </div>

        <div class="filters-section">
          <h3 class="filters-section-title">Portata</h3>
          <div class="filters-options">
            <label class="pill">
              <input type="radio" name="course" :value="null" v-model="draftFilters.course" />
              <span>Qualsiasi</span>
            </label>

            <label v-for="opt in courseOptions" :key="opt" class="pill">
              <input type="radio" name="course" :value="opt" v-model="draftFilters.course" />
              <span>{{ opt }}</span>
            </label>
          </div>
        </div>

        <div class="filters-section">
          <h3 class="filters-section-title">Difficoltà</h3>
          <div class="filters-options">
            <label class="pill">
              <input type="radio" name="difficulty" :value="null" v-model="draftFilters.difficulty" />
              <span>Qualsiasi</span>
            </label>

            <label v-for="opt in difficultyOptions" :key="opt" class="pill">
              <input type="radio" name="difficulty" :value="opt" v-model="draftFilters.difficulty" />
              <span>{{ opt }}</span>
            </label>
          </div>
        </div>

        <div class="filters-section">
          <h3 class="filters-section-title">N° persone</h3>
          <div class="slider-row">
            <input
              class="slider"
              type="range"
              min="0"
              max="12"
              step="1"
              v-model.number="draftFilters.peopleMin"
            />
            <div class="slider-value">
              {{ draftFilters.peopleMin === 0 ? "Qualsiasi" : draftFilters.peopleMin }}
            </div>
          </div>
        </div>

        <div class="filters-section">
          <h3 class="filters-section-title">Tempo di preparazione</h3>
          <div class="filters-options">
            <label class="pill">
              <input type="radio" name="prepTime" :value="null" v-model="draftFilters.prepTime" />
              <span>Qualsiasi</span>
            </label>

            <label v-for="opt in prepTimeOptions" :key="opt.value" class="pill">
              <input type="radio" name="prepTime" :value="opt.value" v-model="draftFilters.prepTime" />
              <span>{{ opt.label }}</span>
            </label>
          </div>
        </div>

        <div class="filters-footer">
          <button class="filters-reset" type="button" @click="resetDraftFilters">Azzera</button>
          <button class="filters-apply" type="button" @click="confirmFilters">Conferma</button>
        </div>
      </div>
    </div>

    <div class="carousel">
      <button
        v-if="nameCarousel.currentRecipe"
        class="nav left"
        type="button"
        @click="nameCarousel.prev"
        aria-label="Ricetta precedente"
      >
        ‹
      </button>

      <Card
        v-if="nameCarousel.currentRecipe"
        class="card"
        :recipeId="String(nameCarousel.currentRecipe.recipe_id)"
        :image="nameCarousel.currentImage"
        :user="nameCarousel.currentRecipe.USERS_username"
        :difficul="nameCarousel.currentRecipe.difficulty"
        :time="minutesToHHMM(nameCarousel.currentRecipe.prep_time)"
        :title="nameCarousel.currentRecipe.name"
        :dishType="nameCarousel.currentRecipe.course"
        :people="nameCarousel.currentRecipe.people"
      />

      <div v-else class="alert">Nessuna ricetta corrisponde alla ricerca</div>

      <button
        v-if="nameCarousel.currentRecipe"
        class="nav right"
        type="button"
        @click="nameCarousel.next"
        aria-label="Ricetta successiva"
      >
        ›
      </button>
    </div>

    <SearchBar
      v-model="s"
      placeholder="Cerca una ricetta per ingredienti..."
      @query="searchByIngredients"
      @action="openFilters"
      :icon="filter"
      buttonAriaLabel="Filtri"
    />

    <div class="carousel">
      <button
        v-if="ingCarousel.currentRecipe"
        class="nav left"
        type="button"
        @click="ingCarousel.prev"
        aria-label="Ricetta precedente"
      >
        ‹
      </button>

      <Card
        v-if="ingCarousel.currentRecipe"
        class="card"
        :recipeId="String(ingCarousel.currentRecipe.recipe_id)"
        :image="ingCarousel.currentImage"
        :user="ingCarousel.currentRecipe.USERS_username"
        :difficul="ingCarousel.currentRecipe.difficulty"
        :time="minutesToHHMM(ingCarousel.currentRecipe.prep_time)"
        :title="ingCarousel.currentRecipe.name"
        :dishType="ingCarousel.currentRecipe.course"
        :people="ingCarousel.currentRecipe.people"
      />

      <div v-else class="alert">Nessuna ricetta corrisponde alla ricerca. Prova a separare gli ingredienti con le virgole
      </div>

      <button
        v-if="ingCarousel.currentRecipe"
        class="nav right"
        type="button"
        @click="ingCarousel.next"
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

.carousel button {
  color: #fff;
}

.alert {
  color: #fff;
  font-weight: bolder;
  background-color: #b83232;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
}

.filters-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
}

.filters-modal {
  width: min(560px, 100%);
  background: #f4f4f4;
  color: #111;
  border-radius: 14px;
  box-sizing: border-box;
  padding: 16px;
  text-align: left;
}

.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.filters-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
}

.filters-x {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
}

.filters-section {
  margin-top: 14px;
}

.filters-section-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 800;
}

.filters-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pill input {
  display: none;
}

.pill span {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 18px;
  background: #d7d3c9;
  color: #111;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  font-size: 14px;
}

.pill input:checked + span {
  background: #1f2a4a;
  color: #fff;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider {
  width: 100%;
}

.slider-value {
  min-width: 110px;
  text-align: right;
  font-weight: 800;
}

.filters-footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
}

.filters-reset,
.filters-apply {
  border: none;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 800;
}

.filters-reset {
  background: #b83232;
  color: #fff;
}

.filters-apply {
  background: #2a882a;
  color: #fff;
}
</style>
