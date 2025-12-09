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
            getUserName() {
                if(this.searchId == "") return;
                else{
                    axios.get("/api/utente/" + this.searchId)
                    .then(response => this.utenti = response.data)
                }
            }
        },
        mounted() {
            this.getUserName();
        }
    })
</script>

<template>
    <form @submit.prevent="getUserName">
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
        <li v-for="utente in utenti">
            <img :src="utente.immagine" alt="immagine utente">
            {{ utente.ID }}
        </li>
    </ul>
</template>