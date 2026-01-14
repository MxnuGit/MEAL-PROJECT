import { ref, computed, onBeforeUnmount, type Ref, type ComputedRef } from "vue"
import type { Recipe } from "../types"

export type RecipeCarousel = {
  recipes: Ref<Recipe[]>
  currentIndex: Ref<number>
  currentRecipe: ComputedRef<Recipe | undefined>
  currentImage: ComputedRef<string>
  setRecipes: (list: Recipe[]) => void
  reset: () => void
  next: () => void
  prev: () => void
  loadImage: (recipe?: Recipe) => string
  clearImageCache: () => void
}

export function useRecipeCarousel(initial: Recipe[] = []): RecipeCarousel {
  const recipes = ref<Recipe[]>(initial)
  const currentIndex = ref(0)

  const imageUrlCache = new Map<number, string>()

  function clearImageCache() {
    for (const url of imageUrlCache.values()) URL.revokeObjectURL(url)
    imageUrlCache.clear()
  }

  function loadImage(recipe?: Recipe): string {
    if (!recipe) return ""

    const id = (recipe as any)?.recipe_id as number | undefined
    const img: any = (recipe as any)?.recipe_image
    if (!img) return ""

    if (typeof img === "string") return img

    if (id != null && imageUrlCache.has(id)) {
      return imageUrlCache.get(id)!
    }

    const data = img?.data
    if (!data || !Array.isArray(data)) return ""

    const bytes = new Uint8Array(data)
    if (!bytes.length) return ""

    const blob = new Blob([bytes], { type: "image/jpeg" })
    const url = URL.createObjectURL(blob)

    if (id != null) imageUrlCache.set(id, url)
    return url
  }

  const currentRecipe = computed(() => recipes.value[currentIndex.value])
  const currentImage = computed(() => loadImage(currentRecipe.value))

  function setRecipes(list: Recipe[]) {
    clearImageCache()

    recipes.value = list
    currentIndex.value = 0
  }

  function reset() {
    currentIndex.value = 0
  }

  function next() {
    const len = recipes.value.length
    if (!len) return
    currentIndex.value = (currentIndex.value + 1) % len
  }

  function prev() {
    const len = recipes.value.length
    if (!len) return
    currentIndex.value = (currentIndex.value - 1 + len) % len
  }

  onBeforeUnmount(() => {
    clearImageCache()
  })

  return {
    recipes,
    currentIndex,
    currentRecipe,
    currentImage,
    setRecipes,
    reset,
    next,
    prev,
    loadImage,
    clearImageCache,
  }
}
