<script setup lang="ts">
    import { ref } from "vue"
    import axios from "axios"
    import type { User } from "../types"
    import SearchBar from "../components/SearchBar.vue"
    import lens from "../assets/lens.png"

    const q = ref("")
    const users = ref<User[]>([])

    async function searchUsers(query: string) {
    const s = query.trim()
    if (!s) {
        users.value = []
        return
    }

    const { data } = await axios.get("/api/user", {
        params: { search: s },
    })

    users.value = data
    }
</script>

<template>
  <SearchBar
    v-model="q"
    placeholder="Cerca un utente"
    :icon="lens"
    buttonAriaLabel="Cerca"
    @query="searchUsers"
    @action="searchUsers"
  />

  <ul v-if="users.length > 0">
    <li v-for="user in users" :key="user.username" id="userItemList">
      <router-link :to="`/UserProfile/${user.username}`">{{ user.username }}</router-link>
    </li>
  </ul>
</template>


<style scoped>
    form {
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px auto;
        max-width: 800px;
    }

    #findUser{
        width: 70%;
        height: 35px;
        font-size: 100%;
        border-radius: 20px;
        text-align: center;
    }

    #userItemList{
        background-color: #DCC9A3;
        border-radius: 6px;
        list-style: none;
        min-width: 20%;
        border: solid white 2px;
        height: 20px;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
        margin-bottom: 8px;
    }

    #findButton {
        max-width: 15%;
        height: 40px;
        font-size: 25px;
        border-radius: 20px;
        background-color: orange;
        font-weight: bold;
    }

    ul {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 0;

    }

    a{
        text-decoration: none;
        color: #262A52;
        text-align: center;
    }
</style>