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
         
        },
        mounted() {
          
        }
    })
</script>

<template>
    <input type="text" 
           placeholder="Cerca un utente"
           id="findUser"
           minlength="2"
           maxlength="20"
           required
           >
    <input type="submit">

</template>