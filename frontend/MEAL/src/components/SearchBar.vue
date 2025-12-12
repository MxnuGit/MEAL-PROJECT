<template>
  <input
    v-model="q"
    :placeholder="placeholder"
    @input="onInput"
  />
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  placeholder: { type: String, default: "Cerca..." },
  onSearch: { type: Function, required: true },
})

const q = ref("")

function onInput() {
  props.onSearch(q.value)
}
</script>
