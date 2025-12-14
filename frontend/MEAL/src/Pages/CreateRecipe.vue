<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    
    export default defineComponent({
        data(){
            return{
                recipeName: "",
                difficulty: "",
                recipeTime: "",

                recipeIngredients: [] as string[],
                recipeIngredientsQuantity: [] as number[],
                recipeIngredientsUnit: [] as string[],

                tags: [] as string[],
                description: "",
                steps: [] as string[]
            }
        },
        methods:{
            addIngredient: function(){
                
            },

            submitRecipe: function(){
                
            }
        },
        mounted() {
            
        },
    })
</script>

<template>
    <div id="container">
        <header>
            <h1>Crea La Tua Ricetta</h1>
        </header>
        <hr>
        <form @submit.prevent="">
            <!-- Nome Ricetta -->
            <label for="recipeName">Nome della Ricetta</label>
            <input type="text" id="recipeName" v-model="recipeName" required>

            <!-- Difficoltà & Tempo -->
            <div>

                <section id="difficulty">
                    <h4>Difficoltà</h4>
                    <select name="difficulty" v-model="difficulty">
                        <option value="easy">Facile</option>
                        <option value="medium">Media</option>
                        <option value="hard">Difficile</option>
                    </select>
                </section>

                <section id="time">
                    <h4>Tempo (minuti)</h4>
                    <input type="text" placeholder="120..." v-model="recipeTime" required>
                </section>

            </div>

            <!-- Ingredienti -->
            <div>

                <section id="ingredients">
                    <h4>Ingredienti</h4>
                    <input type="text" v-model="recipeIngredients" required>
                    <ul>
                        <li><!-- mostra ingredienti scelti--></li>
                    </ul>
                </section>

                <section id="quantity">
                    <h4>Quantità</h4>
                    <input type="text" v-model="recipeIngredientsQuantity" required>
                    <ul>
                        <li><!-- mostra Quantità scelta--></li>
                    </ul>
                </section>

                <section id="unitMisure"> <!-- da fare poi la query -->
                    <h4>Unità di misura</h4>
                    <input type="text" v-model="recipeIngredientsUnit">
                    <ul>
                        <li><!-- mostra Unità di misura scelta--></li>
                    </ul>
                </section>

                <section id="addButton">
                    <button @click="addIngredient">+</button>
                </section>

            </div>
            <div>
                <h4>Tag</h4>

                <input type="checkbox" id="vegan" value="vegan" v-model="tags">
                <label for="vegan">Vegano</label>

                <input type="checkbox" id="lactoseFree" v-model="tags" value="lactoseFree">
                <label for="lactoseFree">Senza lattosio</label>

                <input type="checkbox" id="glutenFree" v-model="tags" value="glutenFree">
                <label for="glutenFree">Senza glutine</label>

                <input type="checkbox" id="proteinRich" v-model="tags" value="proteinRich">
                <label for="proteinRich">Ricco di proteine</label>
            </div>
            <hr>
            <section id="description">
                <h4>Descrizione</h4>
                <textarea name="description" id="descriptionText" v-model="description"></textarea>
            </section>
            <section id="steps">
                <h4>Preparazioni</h4>
                <ul>
                    <!-- <li v-for="step in steps"></li> -->
                </ul>
            </section>
            <button type="submit">Aggiungi Ricetta</button>
        </form>
    </div>
</template>