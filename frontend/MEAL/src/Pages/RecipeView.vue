<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { Ricetta } from '../types';
    
    export default defineComponent({
        data() {
            return {
                ricetta: null as Ricetta | null
            }
        },
        methods: {
            getRecipe: function(){
                axios.get("/api/ricetta/nomericetta")
                    .then(response => this.ricetta = response.data)
            }
        },
        mounted() {
            this.getRecipe()
        }
    })
</script>

<template>
    <div id="container" v-if="ricetta">
        <h1>{{ ricetta.titolo }}</h1>
        <section>
            <div class="img">
                <img :src="ricetta.immagine" alt="immagine ">
            </div>
            <div class="tagViewer">
                <ul>
                    <li>difficoltà: {{ ricetta.difficolta }}</li>
                    <li>Tempo: {{ ricetta.tempoPrep }}</li>
                    <li>Portata: {{ ricetta.portata }}</li>
                    <li></li>
                </ul>
            </div>
        </section>
    </div>
</template>