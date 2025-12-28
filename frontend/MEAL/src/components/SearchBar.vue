<template>
  <div>
    <input
      class="searchbar__input"
      v-model="q"
      :placeholder="placeholder"
      @input="onInput"
      type="text"
    />

    <button class="searchbar__btn" type="button" aria-label="Filtri">
      <img src="../assets/filter.png" alt="Icona filtri" width="30px" height="30px"/>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  placeholder: { type: String, default: "Cerca una ricetta..." },
  onSearch: { type: Function, required: true },
})

const q = ref("")

function onInput() {
  props.onSearch(q.value)
}
</script>

<style scoped>
  div{
    width: 70%;
    height: 52px;
    margin: 50px auto;
    background: #ffffff;
    border-radius: 999px;
    display: flex;
    flex-direction: row;
  }

  .searchbar__input {
    height: 100%;
    width: calc(100% - 52px);
    border: 0;
    outline: none;
    font-size: 14px;
    color: #000000;
    background: none;
    margin: 0 0 0 10px;
    padding: 0;
    justify-self: flex-start;
    margin-right: auto;
  }

  .searchbar__input::placeholder {
    color: #0000009b;
    font-size: 14px;
  }

  .searchbar__btn {
    width: 52px;
    height: 52px;
    border: 0;
    border-radius: 0px 999px 999px 0px;
    background: #f39a2d;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
  }
</style>
