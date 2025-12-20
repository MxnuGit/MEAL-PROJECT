<template>
  <div>
    <div>
      <img :src="image" alt="#" />
      <p>{{ user }}</p>
      <p>{{ difficul }}</p>

      <div>
        <img src="https://www.svgrepo.com/show/421561/clock-time.svg" alt="#" width="20px" height="20px"/>
        <p>{{ time }}</p>
      </div>
    </div>

    <h2>{{ title }}</h2>
    <p>{{ dishType }}</p>
    <p>{{ people }}</p>

    <div>
      <p>{{ likesCount }}</p>

      <button
        type="button"
        :disabled="pending"
        @click="toggleLike"
        style="background: none; border: none; cursor: pointer;"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          :fill="liked ? '#0b0b0b' : '#ffffff'"
          :stroke="liked ? '#0b0b0b' : '#ffffff'"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps({
    recipeId: {type: String, required: true},
    image: {type: String, required: true},
    user: {type: String, required: true},
    difficul: {type: String, required: true},
    time: {type: String, required: true},
    title: {type: String, required: true},
    dishType: {type: String, required: true},
    people: {type: String, required: true},
    likes: {type: Number, required: true},
    likedByMe: {type: Boolean, default: false}
})

const likesCount = ref<number>(props.likes)
const liked = ref<boolean>(props.likedByMe)
const pending = ref(false)

watch(() => props.likes, (v) => (likesCount.value = v))
watch(() => props.likedByMe, (v) => (liked.value = v))


function toggleLike() {
  liked.value = !liked.value
  likesCount.value = liked.value ? 1 : 0
}
</script>
