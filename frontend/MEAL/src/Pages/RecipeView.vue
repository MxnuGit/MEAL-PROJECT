<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { Recipe, Ingredient, Preparation } from "../types";

export default defineComponent({
  data() {
    return {
      recipe: null as Recipe | null,
      ingredients: [] as Ingredient[],
      preparations: [] as Preparation[],
    };
  },

  methods: {
    async getRecipe() {
      const id = this.$route.params.id;
      const res = await axios.get(`/api/recipes/${id}`);
      this.recipe = res.data;
    },
    
    async getIngredients() {
      const id = this.$route.params.id;
      const res = await axios.get(`/api/recipes/${id}/ingredients`);
      this.ingredients = res.data;
    },

    async getPreparations() {
      const id = this.$route.params.id;
      const res = await axios.get(`/api/recipes/${id}/steps`);
      this.preparations = res.data;
    }
  },

  // WATCH NECESSARIO AL FINE DI CAMBIARE I DATI AL CAMBIO DELLA PAGINA
  // (MOUNTED ESEGUE UNA SOLA VOLTA, WATCH AD OGNI RENDER)
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.getRecipe(),
        this.getIngredients(),
        this.getPreparations();
      }
    }
  }
});
</script>
<!-- TUTTI I VALORI ANDRANNO SOSTITUITI CON I VALORI EFFETTIVI DATI DALLE QUERY UNA VOLTA SVOLTE -->
<template>
    <div id="container">
        <header id="title">
            <h1>{{ recipe?.name }}</h1>
        </header>
        <div id="firstPart">
            <section id="imageCont">
                <img src="..\assets\carbonara.jpg" alt="">
            </section>
            <section id="tagView">
                <ul>
                    <li>Difficoltà: {{ recipe?.difficulty }}</li>
                    <li>Tempo: {{ recipe?.prep_time }}</li>
                    <li>Portata: {{ recipe?.course }}</li>
                </ul>
            </section>
        </div>
        <hr>
        <section id="secondPart">
            <section id="description">
                <h2>Descrizione</h2>
                <p>{{ recipe?.description }}</p>
            </section>
            <section id="ingredients">
                <h2>Ingredienti</h2>
                <ul>
                    <li v-for="ingredient in ingredients">{{ ingredient.name }} {{ ingredient.quantity }} {{ ingredient.unit }}</li>
                </ul>
            </section>
        </section>
        <section id="thirdPart">
            <h2>Preparazione</h2>
            <ul>
                <li v-for="preparation in preparations">{{ preparation.stepNumber}}. {{ preparation.stepDesc }}</li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
    #container{
        background-color: #DCC9A3;
        border-radius: 10px;
        border: 2.5px solid white;
        max-width: 80%;
        margin: 80px auto;
        padding: 10px;
    }

    #title h1 {
        font-size: 35px;
        color: #262a52;
        margin: 10px 0 10px;
        margin-left: 20px;
    }

    #title{
        border-bottom: #262a52 solid 2px;
    }

    #firstPart{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #firstPart #imageCont{
        display: flex;
    }

    #imageCont img{
        max-width: 224px;
        border-radius: 10px;
    }

    #tagView{
        background-color: #262a52;
        border-radius: 10px;
        min-width: 200px;
        max-width: 310px;
        display: flex;
        justify-content: center;
    }

    #tagView ul{
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
    }

    #tagView ul li{
        color: aliceblue;
        padding: 5px 0 5px;
        text-align: center; 
        font-weight: bold;      
    }

    #imageCont, #tagView{
        margin-top: 10px;
    }

    @media (min-width:1024px) {
        #firstPart{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 20px 0 20px;
        }

        #imageCont img{
            max-width: 300px;
            margin-left: 80px;
            border-radius: 10px;
        }

        #tagView{
            margin-right: 80px;
            padding: 30px 5px 30px;
        }

        #title h1 {
            font-size: 45px;
            color: #262a52;
            margin: 10px 0 10px;
            margin-left: 30px;
        }
    }
</style>