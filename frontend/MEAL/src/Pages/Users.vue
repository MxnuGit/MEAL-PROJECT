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
                if(this.searchId == "") return;
                else{
                    axios.get("/api/utente/" + this.searchId)
                    .then(response => this.users = response.data)
                }
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
               maxlength="20"
               required>
        <button type="submit">Cerca</button>
    </form>

    <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user.username">
            {{ user.username }}
        </li>
    </ul>
</template>