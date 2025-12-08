<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { Utente } from '../types';
    
    export default defineComponent({
        data() {
            return {
              utenti: [] as Utente[]
            }
        },
        methods: {
            getUserName() {
                axios.get("/api/utente/" + this.$route.params.ID)
                .then(response => this.utenti = response.data)
            }
        },
        mounted() {
            this.getUserName();
        }
    })
</script>

<template>
    <input type="text" 
           placeholder="Cerca un utente"
           id="findUser"
           minlength="2"
           maxlength="20"
           required>
    <input type="submit">

    <ul>
        <li v-for="utente in utenti">
            <img :src="utente.immagine" alt="immagine utente">
            {{ utente.ID }}
        </li>
    </ul>
</template>