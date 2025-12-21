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
            // getRecipe: function(){
            //     axios.get("/api/recipe/" + this.recipe)
            //         .then(response => this.recipe = response.data)
            // },

            // getIngredients: function(){
            //     axios.get("/api/recipe/" + this.recipe + "/" + this.ingredients)
            //         .then(response => this.ingredients = response.data)
            // },

            // getStepsByRecipe: function(){
            //     axios.get("/api/recipe/"+ this.$route.params.nomericetta + "/steps/")
            //         .then(response => this.preparations = response.data)
            // }
        },
        mounted() {
            // this.getRecipe();
            // this.getIngredients();
            // this.getStepsByRecipe();
        }
    })
</script>
<!-- TUTTI I VALORI ANDRANNO SOSTITUITI CON I VALORI EFFETTIVI DATI DALLE QUERY UNA VOLTA SVOLTE -->
<template>
    <div id="container">
        <header id="title">
            <h1>Carbonara</h1>
        </header>
        <div id="firstPart">
            <section id="imageCont">
                <img src="..\assets\carbonara.jpg" alt="">
            </section>
            <section id="tagView">
                <ul>
                    <li>difficoltà: FACILE</li>
                    <li>Tempo: 120</li>
                    <li>Portata: PRIMO</li>
                </ul>
            </section>
        </div>
        <hr>
        <section id="secondPart">
            <section id="description">
                <h2>Descrizione</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae blanditiis architecto fugit aliquam in iure nulla cupiditate quibusdam eum. Iure, nisi. Veritatis sapiente amet, quis fuga qui nulla est eum!</p>
            </section>
            <section id="ingredients">
                <h2>ingredients</h2>
                <ul>
                    <li>PASTA</li>
                    <li>PASTA</li>
                    <li>PASTA</li>
                </ul>
            </section>
        </section>
        <section id="thirdPart">
            <h2>Preparazione</h2>
            <ul>
                <li>TAGLIA IL PANE</li>
                <li>TAGLIA IL PANE</li>
                <li>TAGLIA IL PANE</li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
    #container{
        background-color: #DCC9A3;
        border-radius: 10px;
        border-color: white;
        border: 2.5px solid white;
        width: 100%;
        max-width: 800px;
        margin: 80px auto;
        padding: 10px;
    }

    #title h1 {
        margin-left: 40px;
        margin-top: 40px;
        font-size: 2.5rem;
        color: #262a52;
    }

    #firstPart {
        display: flex;
        gap: 40px;
        align-items: center;
        justify-content: center;
    }

    #tagView {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #262a52;
        border-radius: 20px;
        color: #ffffff;
        width: 30%;
        height: 140px;
    }

    #tagView ul{
        padding: 20px;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    #tagView li {
        margin-bottom: 10px;
        margin-top: 10px;
        list-style: none;
        font-weight: bold;
    }

</style>