<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    
    export default defineComponent({
        data(){
            return{
                recipeName: "",
                difficulty: "",
                recipeTime: "",
                
                ingredientInput: "",
                quantityInput: null as number | null,
                unitInput: "",

                ingredients: [] as {
                    name: string,
                    quantity: number,
                    unit: string
                }[],

                tag: {
                    vegan: false,
                    proteinRich: false,
                    lactoseFree: false,
                    glutenFree: false,
                },

                // recipeIngredients: [] as string[],
                // recipeIngredientsQuantity: [] as number[],
                // recipeIngredientsUnit: [] as string[],

                description: "",
                steps: [] as {
                    step: string
                }[]
            }
        },
        methods:{
            addIngredient: function(){
                if(!this.ingredientInput || this.quantityInput === null || !this.unitInput) {
                    return
                }
                // this.recipeIngredients.push(this.ingredientInput);
                // this.recipeIngredientsQuantity.push(this.quantityInput);
                // this.recipeIngredientsUnit.push(this.unitInput);

                this.ingredients.push(
                    {
                        name: this.ingredientInput,
                        quantity: this.quantityInput,
                        unit: this.unitInput
                    }
                )

                this.ingredientInput = "";
                this.quantityInput = null;
                this.unitInput = "";
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
             <section id="nameField">
                <label for="recipeName">Nome della Ricetta</label>
                <input type="text" id="recipeName" v-model="recipeName" required>
             </section>

            <!-- Difficoltà & Tempo -->
            <div id="firstPart">
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
            <div id="secondPart">
                <section id="ingredients">
                    <h4>Ingredienti</h4>
                    <input type="text" v-model="ingredientInput" required>
                    <ol>
                        <li v-for="(ingredient, i) in ingredients" :key="i">{{ ingredient.name }}</li>
                    </ol>
                </section>

                <section id="quantity">
                    <h4>Quantità</h4>
                    <input type="text" v-model="quantityInput" required>
                    <ol>
                        <li v-for="(ingredient, i) in ingredients" :key="i">{{ ingredient.quantity }}</li>
                    </ol>
                </section>

                <section id="unitMisure"> <!-- da fare poi la query -->
                    <h4>Unità</h4>
                    <input type="text" v-model="unitInput" required>
                    <ol>
                        <li v-for="(ingredient, i) in ingredients" :key="i">{{ ingredient.unit }}</li>
                    </ol>
                </section>

                <section id="addButton">
                    <button type="button" @click="addIngredient">+</button>
                </section>

            </div>
            <div id="tagDiv">
                <h4>Tag</h4>

                <input type="checkbox" id="vegan" value="vegan" v-model="tag.vegan">
                <label for="vegan">Vegano</label>

                <input type="checkbox" id="lactoseFree" v-model="tag.lactoseFree" value="lactoseFree">
                <label for="lactoseFree">Senza lattosio</label>

                <input type="checkbox" id="glutenFree" v-model="tag.glutenFree" value="glutenFree">
                <label for="glutenFree">Senza glutine</label>

                <input type="checkbox" id="proteinRich" v-model="tag.proteinRich" value="proteinRich">
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

<style scoped> 
    #container{
        background-color: #DCC9A3;
        border-radius: 20px;
        border-color: white;
        border: 2.5px solid white;
        width: 100%;
        max-width: 800px;
        margin: 80px auto;
        padding: 10px;
    }

    header {
        display: flex;
        justify-content: center;
    }

    header h1 {
        font-weight: bold;
        color: #262a52;
        margin-top: 5%;
        margin-bottom: 10px;
    }

    hr{
        width: 95%;
        background-color: #262a52;
        height: 3px;
    }

    #nameField {
        display: flex;
        flex-direction: column;
        margin-left: 10%;
        margin-right: 10%;
    }

    #nameField label, h4 {
        color: #262a52;
        font-weight: bold;
        margin-bottom: 0;
    }
    
    input {
        color: #262a52;
        width: 100%;
        border-radius: 6px;
        height: 25px;
    }

    #firstPart {
        display: flex;
        flex-direction: row;
    }

    #firstPart #difficulty{
        margin-left: 10%;
        margin-right: 10%;
    }

    #firstPart #difficulty h4 {
        color: #262a52;
        font-weight: bold;
    }

    #firstPart #difficulty select {
        width: 100%;
        height: 30px;
        border-radius: 6px;
    }

    #secondPart {
        display: flex;
        align-items: center;
    }

    #secondPart section {
        padding: 10px;
    }

    #secondPart section input{
        width: 100%;
    }

    #secondPart section:nth-child(1) {
        margin-left: 10%;
        padding-left: 0px;
    }

    #addButton button{
        height: 20px;
        margin-top: 23px;
        background-color: greenyellow;
        border-radius: 5px;
        border: none;
    }

    #tagDiv {
        margin-left: 10%;
        margin-right: 10%;
    }

    #vegan, #proteinRich, #glutenFree, #lactoseFree {
        width: 30px;
    }

    #description {
        margin-left: 10%;
        margin-right: 10%;
    }

    #descriptionText {
        width: 100%;
        height: 50px;
        resize: none;
        border-radius: 6px;
        border-color: black;
    }

</style>