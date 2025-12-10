<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { Ricetta, Ingrediente, Preparazioni } from '../types';
    
    export default defineComponent({
        data() {
            return {
                ricetta: null as Ricetta | null,
                ingredienti: [] as Ingrediente[],
                preparazioni: [] as Preparazioni[]
            }
        },
        methods: {
            getRecipe: function(){
                axios.get("/api/ricetta/" + this.ricetta)
                    .then(response => this.ricetta = response.data)
            },

            getIngredients: function(){
                axios.get("/api/ricetta/" + this.ricetta + "/" + this.ingredienti)
                    .then(response => this.ingredienti = response.data)
            },

            getStepsByRecipe: function(){
                axios.get("/api/ricetta/"+ this.$route.params.nomericetta + "/passaggi/")
                    .then(response => this.preparazioni = response.data)
            }
        },
        mounted() {
            this.getRecipe();
            this.getIngredients();
            this.getStepsByRecipe();
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
        <section class="2/3">
            <section class="description">
                <h2>Descrizione</h2>
                <p>{{ ricetta.descrizione }}</p>
            </section>
            <section class="ingredients">
                <h2>Ingredienti</h2>
                <ul>
                    <li v-for="ingrediente in ingredienti">{{ ingrediente.nome }}</li>
                </ul>
            </section>
        </section>
        <section class="3/3">
            <h2>Preparazione</h2>
            <ul>
                <li v-for="passaggio in preparazioni">{{ passaggio.step }}. {{ passaggio.passaggio }}</li>
            </ul>
        </section>
    </div>
</template>