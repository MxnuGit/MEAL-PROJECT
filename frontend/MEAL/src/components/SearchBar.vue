<template>
  <div class="searchbar">
    <input
      class="searchbar__input"
      v-model="model"
      :placeholder="placeholder"
      type="text"
    />

    <button
      class="searchbar__btn"
      type="button"
      :aria-label="buttonAriaLabel"
      @click="onButtonClick"
    >
      <img :src="icon" :alt="iconAlt" width="30" height="30" />
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue"
import defaultIcon from "../assets/filter.png"

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Cerca una ricetta..." },

  icon: { type: String, default: defaultIcon },
  iconAlt: { type: String, default: "icona" },

  buttonAriaLabel: { type: String, default: "Azione" },
})

const emit = defineEmits(["update:modelValue", "query", "action"])

const model = computed({
  get: () => props.modelValue,
  set: (v) => {
    emit("update:modelValue", v)
    emit("query", v)
  },
})

function onButtonClick() {
  emit("action", props.modelValue)
}
</script>

<style scoped>
  div{
    width: 85%;
    height: 40px;
    margin: 50px auto 10px auto;
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
    height: 40px;
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

  @media (min-width: 1440px) {
    div {
      max-width: 670px;
    }
  }

  @media (min-width: 2560px) {
    div{
      height: 70px;
    }

    .searchbar__btn {
      height: 70px;
    }

    .searchbar__input {
      font-size: 25px;
    }
    .searchbar__input::placeholder {
      font-size: 25px;
    }
  }
</style>
