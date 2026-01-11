<script lang="ts">
import { defineComponent } from 'vue';
import type{ Ingredient, Preparation, User} from '../types';
import axios from 'axios';
    export default defineComponent({
        data(){
            return{
                recipeName: "",
                difficulty: "",
                selCourse: "",
                recipeTime: "",
                recipeImage: "",
                user: null as User | null,
                people: "",
                
                ingredientInput: "",
                quantityInput: null as number | null,
                unitInput: "",
                stepNumber: 1,
                stepDescInput: "",

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
                    stepDesc: string,
                    stepNumber: number
                }[],
                
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

            addStep(){
                if(this.stepDescInput == null) {
                    return
                }

                this.steps.push(
                    {
                        stepDesc: this.stepDescInput,
                        stepNumber: this.stepNumber
                    }
                )

                this.stepDescInput = ""
                this.stepNumber++
            },

            async getUser() {
                const res = await axios.get("/api/auth/profile")
                this.user = res.data;
            },

            async submitRecipe(){
                if(!this.recipeName || !this.difficulty || !this.recipeTime){
                    console.error("Inserisci campi obbligatori");
                    return;
                }

                const ricetta = 
                {
                    name: this.recipeName,
                    USERS_username: this.user?.username,
                    course: this.selCourse,
                    description: this.description,
                    difficulty: this.difficulty,
                    isGlutenFree: this.tag.glutenFree,
                    isLactoseFree: this.tag.lactoseFree,
                    isProteinRich: this.tag.proteinRich,
                    isVegan: this.tag.vegan,
                    prep_time: this.recipeTime, 
                    recipe_image: this.recipeImage,
                    ingredients: this.ingredients,
                    steps: this.steps
                };
                
                await axios.post("/api/createRecipe", ricetta);
            },

            convertImg(e: Event){
                const target = e.target as HTMLInputElement;
                if (!target.files || target.files.length === 0) return;
                
                const reader = new FileReader();
                const file = target.files[0];

                reader.onload = () => {
                    const base64 = reader.result as string;
                    this.recipeImage = base64;
                }
                
                if (!file) return;

                reader.readAsDataURL(file);
            }
            
        },
        mounted() {
            this.getUser()
        },
    })
</script>

<template>
    <div id="container">
        <header>
            <h1>Crea La Tua Ricetta</h1>
        </header>
        <form @submit.prevent="submitRecipe">
            <!-- Nome Ricetta -->
             <section id="nameField">
                <label for="recipeName">Nome della Ricetta</label>
                <div id="nameAndImage">
                    <input type="text" id="recipeName" v-model="recipeName" required>
                    <input type="file" @change="convertImg">
                </div>
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
                    <h4>Minuti</h4>
                    <input type="text" placeholder="120..." v-model="recipeTime" id="inputTime" required>
                </section>

                <section id="course">
                    <h4>Portata:</h4>
                    <select name="course" v-model="selCourse">
                        <option value="antipasto">Antipasto</option>
                        <option value="primo">Primo</option>
                        <option value="secondo">Secondo</option>
                        <option value="dolce">Dolce</option>
                    </select>
                </section>
            </div>

            <!-- Ingredienti -->
            <div id="secondPart">
                <section id="people">
                    <h4>Dosi persone</h4>
                    <input type="number" v-model="people" id="peopleInput">
                </section>

                <section id="ingredients">
                    <h4>Ingredienti</h4>
                    <input type="text" v-model="ingredientInput" id="inputIngredients">
                    <ol>
                        <li v-for="(ingredient, i) in ingredients" :key="i">{{ ingredient.name }}</li>
                    </ol>
                </section>

                <section id="quantity">
                    <h4>Quantità</h4>
                    <input type="text" v-model="quantityInput">
                    <ol>
                        <li v-for="(ingredient, i) in ingredients" :key="i">{{ ingredient.quantity }}</li>
                    </ol>
                </section>

                <section id="unitMisure">
                    <h4>Unità</h4>
                    <input type="text" v-model="unitInput">
                    <ol>
                        <li v-for="(ingredient, i) in ingredients" :key="i">{{ ingredient.unit }}</li>
                    </ol>
                </section>

                <section id="addButton">
                    <button type="button" @click="addIngredient">Aggiungi</button>
                </section>
                
            </div>
            <div id="tagDiv">
                <h4>Tag</h4>
                <div id="tagInputDiv">
                    <div>
                        <input type="checkbox" id="vegan" value="vegan" v-model="tag.vegan">
                        <label for="vegan">Vegano</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="lactoseFree" v-model="tag.lactoseFree" value="lactoseFree">
                        <label for="lactoseFree">Senza lattosio</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="glutenFree" v-model="tag.glutenFree" value="glutenFree">
                        <label for="glutenFree">Senza glutine</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="proteinRich" v-model="tag.proteinRich" value="proteinRich">
                        <label for="proteinRich">Ricco di proteine</label>
                    </div>
                </div>
            </div>
            <section id="description">
                <h4>Descrizione</h4>
                <textarea name="description" id="descriptionText" v-model="description"></textarea>
            </section>
            <section id="steps">
                <h4>Preparazioni</h4>
                <input v-model="stepDescInput" type="text">
                <ul>
                    <li v-for="step in steps"><span id="bold">{{ step.stepNumber }}</span>.{{ step.stepDesc }}</li>
                </ul>
                <section id="addButton">
                    <button type="button" @click="addStep">Aggiungi</button>
                </section>
            </section>
            <section id="lastSection">
                <button type="submit" id="sendRecipe">Conferma</button>
            </section>
        </form>
    </div>
</template>

<style scoped> 
    #container{
        background-color: #DCC9A3;
        border-radius: 20px;
        border-color: white;
        border: 2.5px solid white;
        width: 80%;
        max-width: 800px;
        margin: 80px auto;
        padding: 10px;
    }

    header {
        display: flex;
        justify-content: center;
        border-bottom: solid #262A52; 
    }

    header h1 {
        font-weight: bold;
        color: #262a52;
        margin-top: 5%;
        margin-bottom: 5px;
    }

    #nameField {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
    }

    #nameField label, h4 {
        color: #262a52;
        font-weight: bold;
        margin: 0;
        margin-top: 10px;
    }

    #nameAndImage {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-wrap: wrap;
    }
    
    input, textarea, select {
        color: #262a52;
        width: 40%;
        border-radius: 6px;
        height: 27px;
        border: white;
    }

    button{
        background-color: #68B65B;
        color: white;
        font-weight: bold;
        font-size: larger;
        border-radius: 6px;
        border: white 2.5px;
        cursor: pointer;
        margin-left: 10px;
    }

    #firstPart {
        display: flex;
        flex-direction: row;
        gap: 10%;
    }

    #firstPart #difficulty{
        padding-left: 10px;
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
        align-items: flex-start;
        width: 60%;
        justify-content: center;
    }

    #secondPart section input{
        width: 100%;
    }

    #secondPart section {
        padding-left: 10px;
        padding-right: 10px;
    }

    #addButton button{
        max-width: 100%;
        background-color: #68B65B;
        border-radius: 5px;
        border: none;
        margin: 0;
        margin-bottom: 20px;
        font-size: 17px;
    }

    #tagDiv {
        padding-left: 10px;
        border-top: solid #262A52;
        border-bottom: solid #262A52;
        padding-bottom: 10px;
    }

    #tagInputDiv {
        flex-direction: column;
    }

    #vegan, #proteinRich, #glutenFree, #lactoseFree {
        width: 30px;
    }

    #description {
        padding-left: 10px;
        padding-right: 10px;
    }

    #descriptionText {
        width: 100%;
        height: 50px;
        resize: none;
        border-radius: 6px;
        border-color: black;
    }
    #steps{
        padding-left: 10px;
        padding-right: 10px;
    }

    #steps input{
        width: 60%;
    }

    #steps li{
        list-style: none;
        overflow-wrap: break-word;
        white-space: normal;
        width: 100%;
        padding-top: 10px;
        font-size: 15px;
    }

    #steps ul{
        padding: 0;
    }

    #lastSection{
        display: flex;
        justify-content: flex-end;
    }

    #bold{
        font-weight: bold;
        font-size: 17px;
    }

    #time input, #course select{
        width: 100%;
        height: 28px;
    }

    #peopleInput{
        margin-bottom: 10px;
    }

</style>