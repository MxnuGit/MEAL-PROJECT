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
        },

        goToProfile(user: User){
            this.$router.push(`/UserProfile/${user.username}`)
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
        <button type="submit" id="findButton">⌕</button>
    </form>

    <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user.username" id="userItemList">
            <router-link :to="`/UserProfile/${ user.username }`">{{ user.username }}</router-link>
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
        border-color: white;
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