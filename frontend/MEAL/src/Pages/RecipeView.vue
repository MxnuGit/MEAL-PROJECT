<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { Recipe, Ingredient, Preparation } from "../types";

export default defineComponent({
  data() {
    return {
      recipe: null as Recipe | null,
      ingredients: [] as Ingredient[],
      preparations: [] as Preparation[]
    };
  },

  methods: {
    async getRecipe() {
      const id = this.$route.params.id;
      const res = await axios.get(`/api/recipes/${id}`);
      this.recipe = res.data;
    },

    /*
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
      */
  },

  // WATCH NECESSARIO AL FINE DI CAMBIARE I DATI AL CAMBIO DELLA PAGINA
  // (MOUNTED ESEGUE UNA SOLA VOLTA, WATCH AD OGNI RENDER)
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.getRecipe();
        /*
        this.getIngredients();
        this.getPreparations();
        */
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
                    <li>difficoltà: {{ recipe?.difficulty }}</li>
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
        border: 2.5px solid white;
        max-width: 80%;
        margin: 80px auto;
        padding: 10px;
    }

    #title h1 {
        margin-left: 3%;
        margin-top: 5%;
        font-size: 35px;
        color: #262a52;
    }

    #firstPart {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10%;
    }

    #imageCont img {
        width: 100%;
        height: auto;
        max-width: 200px;
        max-height: 200px;
        border-radius: 20px;
    }

    #tagView {
        display: flex;
        justify-content: center;
        justify-items: center;
        background-color: #262a52;
        border-radius: 20px;
        color: #ffffff;
    }

    #tagView ul{
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 10px;
        margin: 0 auto;
    }

    #tagView li {
        margin-bottom: 10px;
        margin-top: 10px;
        list-style: none;
        font-weight: bold;
    }

    @media screen and (min-width: 800px) {
    #imageCont{
        float: left;
    }
}
</style>