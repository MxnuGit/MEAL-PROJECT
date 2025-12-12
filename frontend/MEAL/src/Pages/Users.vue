<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { Utente } from '../types';
    
    export default defineComponent({
        data() {
            return {
              utenti: [] as Utente[],
              searchId: ""
            }
        },
        methods: {
            userByID() {
                if(this.searchId == "") return;
                else{
                    axios.get("/api/utente/" + this.searchId)
                    .then(response => this.utenti = response.data)
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

    <ul v-if="utenti.length > 0">
        <li v-for="utente in utenti" :key="utente.ID">
                <img :src="utente.immagine" alt="">
                <p>{{ utente.ID }}</p> 
        </li>
    </ul>
</template>