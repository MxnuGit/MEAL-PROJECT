<template>
  <article class="recipe-card">
    <a :href="`/RecipeView/${ recipeId }`">
      <div class="recipe-card__media">
        <img class="recipe-card__img" :src="image" alt="" />
        <div class="recipe-card__meta">
          <span class="pill pill--name">{{ user }}</span>
          <span class="pill" :class="difficultyPillClass">
            {{ difficul }}
          </span>
          <span class="pill pill--time">
            <svg
              class="pill__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" />
              <path d="M12 7v6l4 2" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span>{{ time }}</span>
          </span>
        </div>
      </div>

      <div class="recipe-card__body">
        <h2 class="recipe-card__title">{{ title }}</h2>

        <div class="recipe-card__footer">
          <div class="recipe-card__badges">
            <span class="badge">{{ dishType }}</span>
            <span class="badge">{{ people }}</span>
          </div>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
  recipeId: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: String, required: true },
  difficul: { type: String, required: true },
  time: { type: String, required: true },
  title: { type: String, required: true },
  dishType: { type: String, required: true },
  people: { type: String, required: true }
})

const difficultyPillClass = computed(() => {
  const d = props.difficul.toLowerCase()
  if (d.includes("fac")) return "pill--easy"
  if (d.includes("med")) return "pill--medium"
  if (d.includes("diff")) return "pill--hard"
  return "pill--neutral"
})
</script>

<style scoped>

a{
  text-decoration: none;
}
a:visited{
  color: inherit;
  text-decoration: none;
}
a:active{
  color: inherit;
  text-decoration: none;
}

.recipe-card {
  width: min(230px);
  background: rgb(220, 201, 163);
  border-radius: 28px;
  box-sizing: border-box;
}

.recipe-card__media {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  height: 190px;
}

.recipe-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-card__meta {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(220, 201, 163, 0.8);
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 7px 12px;
  border-radius: 999px;
  font-weight: bolder;
  font-size: 10px;
}

.pill--name,
.pill--time {
  background: #262a52;
  color: #fff;
}

.pill--easy {
  background: #61a959;
  color: #000000;
}

.pill--hard {
  background: #b14036; 
  color: #fff;
}

.pill--medium {
  background: #e36700;
  color: #000000;
}

.pill__icon {
  display: block;
}

.recipe-card__body {
  padding: 10px 6px 0;
}

.recipe-card__title {
  margin: 6px 10px;
  font-weight: bolder;
  font-size: 25px;
  color: #262a52;
}

.recipe-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.recipe-card__badges {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 10px;
  gap: 8px;
  width: 80%;
}

.badge {
  background: #262a52;
  color: #fff;
  border-radius: 999px;
  padding: 12px 16px;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
}

@media (min-width: 1024px) {
  .recipe-card {
    width: min(300px);
  }
}
</style>
