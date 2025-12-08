<template>
  <div>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Cerca..."
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchTerm = ref('')

watch(searchTerm, (newVal, oldVal) => {
  if (newVal.length > oldVal.length) {
    console.log('Contenuto input:', newVal)
  }
})
</script>
