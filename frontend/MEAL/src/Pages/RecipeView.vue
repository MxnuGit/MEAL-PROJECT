<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { Ricetta } from '../types';
    import type { Ingrediente } from '../types';
    
    export default defineComponent({
        data() {
            return {
                ricetta: null as Ricetta | null,
                ingredienti: [] as Ingrediente[]
            }
        },
        methods: {
            getRecipe: function(){
                axios.get("/api/ricetta/" + this.$route.params.nomericetta)
                    .then(response => this.ricetta = response.data)
            },

            getIngredients: function(){
                axios.get("/api/ricetta/" + this.$route.params.ingredienti)
                    .then(response => this.ingredienti = response.data[0])
            }
        },
        mounted() {
            this.getRecipe(),
            this.getIngredients()
        }
    })
</script>

<template>
    <div id="container" v-if="ricetta">
        <h1>{{ ricetta.titolo }}</h1>
        <section class="1/3">
            <div class="img">
                <img :src="ricetta.immagine" alt="immagine ">
            </div>
            <div class="tagViewer">
                <ul>
                    <li>difficoltà: {{ ricetta.difficolta }}</li>
                    <li>Tempo: {{ ricetta.tempoPrep }}</li>
                    <li>Portata: {{ ricetta.portata }}</li>
                </ul>
            </div>
        </section>
        <hr>
    </div>
</template>