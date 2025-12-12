<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { Recipe, Ingredient, Preparation } from '../types';
    
    export default defineComponent({
        data() {
            return {
                recipe: null as Recipe | null,
                ingredients: [] as Ingredient[],
                preparations: [] as Preparation[]
            }
        },
        methods: {
            getRecipe: function(){
                axios.get("/api/recipe/" + this.recipe)
                    .then(response => this.recipe = response.data)
            },

            getIngredients: function(){
                axios.get("/api/recipe/" + this.recipe + "/" + this.ingredients)
                    .then(response => this.ingredients = response.data)
            },

            getStepsByRecipe: function(){
                axios.get("/api/recipe/"+ this.$route.params.nomericetta + "/steps/")
                    .then(response => this.preparations = response.data)
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
    <div id="container" v-if="recipe">
        <h1>{{ recipe.name }}</h1>
        <section class="1/3">
            <div class="tagViewer">
                <ul>
                    <li>difficoltà: {{ recipe.difficulty }}</li>
                    <li>Tempo: {{ recipe.prep_time }}</li>
                    <li>Portata: {{ recipe.course }}</li>
                </ul>
            </div>
        </section>
        <hr>
        <section class="2/3">
            <section class="description">
                <h2>Descrizione</h2>
                <p>{{ recipe.description }}</p>
            </section>
            <section class="ingredients">
                <h2>ingredients</h2>
                <ul>
                    <li v-for="ingredient in ingredients">{{ ingredient.name }}</li>
                </ul>
            </section>
        </section>
        <section class="3/3">
            <h2>Preparazione</h2>
            <ul>
                <!-- <li v-for="step in preparazioni">{{ passaggio.step }}. {{ passaggio.passaggio }}</li> -->
            </ul>
        </section>
    </div>
</template>