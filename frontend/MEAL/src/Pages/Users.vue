<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { User } from '../types';
    
    export default defineComponent({
        data() {
            return {
              users: [] as User[],
              searchId: ""
            }
        },
    methods: {
        userByID() {
            if (this.searchId.length < 1) return

            axios.get("/api/user", {
                params: {
                    search: this.searchId
                }
            }).then(response => {
                this.users = response.data
            })
        }
    }
})
</script>

<template>
    <form @submit.prevent="userByID">
        <input type="text"
               v-model="searchId"
               placeholder="Cerca un utente"
               id="findUser"
               minlength="2"
               maxlength="20">
        <button type="submit" id="findButton">O</button>
    </form>

    <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user.username" id="userItemList">
            {{ user.username }}
        </li>
    </ul>
</template>

<style scoped>
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px auto;
        max-width: 800px;
    }

    #findUser{
        width: 100%;
        height: 35px;
        font-size: 100%;
        border-radius: 20px;
        text-align: center;
    }

    #userItemList{
        background-color: #DCC9A3;
        border-radius: 6px;
        list-style: none;
        width: 30%;
        border-color: white;
        border: solid white 2px;
        height: 20px;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
    }

    #findButton {
        width: 5%;
        height: 40px;
        font-size: 15px;
        border-radius: 20px;
        background-color: orange;
        font-weight: bold;
    }

    ul {
        display: flex;
        justify-content: center;
    }
</style>