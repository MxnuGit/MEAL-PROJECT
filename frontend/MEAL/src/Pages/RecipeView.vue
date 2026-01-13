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
    },

    encodeImage() {
        const img: any = this.recipe?.recipe_image;
        if (!img) return ""
        if (typeof img === "string") return img
        if (img?.data && Array.isArray(img.data)) {
            const bytes = new Uint8Array(img.data)
            let bin = ""
            for (const b of bytes) {
                const n = Number(b)
                if (!Number.isFinite(n)) continue
                bin += String.fromCodePoint(n)
            }
            
            return `data:image/jpeg;base64,${btoa(bin)}`
        }

    return ""
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
        this.getPreparations(),
        this.encodeImage()
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
            <section id="tag">
                <p v-if="recipe?.isGlutenFree">No Glutine</p>
                <p v-if="recipe?.isLactoseFree">No Lattosio</p>
                <p v-if="recipe?.isProteinRich">Proteico</p>
                <p v-if="recipe?.isVegan">Vegana</p>
            </section>
        </header>
        <div id="firstPart">
            <section id="imageCont">
                <img :src="encodeImage()" alt="">
            </section>
            <section id="tagView">
                <ul>
                    <li>Difficoltà: {{ recipe?.difficulty }}</li>
                    <li>Tempo: {{ recipe?.prep_time }} minuti</li>
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

    #tag{
        display: flex;
        flex-wrap: nowrap;
    }

    #tag p{
        display: inline-block;
        width: 20%;
        margin: 5px;
        font-size: 10px;
        background-color: #262a52;
        color: white;
        border-radius: 5px;
        min-height: 20px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 120px;
    }

    #title h1 {
        font-size: 35px;
        color: #262a52;
        margin: 10px 5px 10px;
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
        max-width: 200px;
        border-radius: 10px;
    }

    #tagView{
        background-color: #262a52;
        border-radius: 10px;
        min-width: 200px;
        max-width: 310px;
        display: flex;
        justify-content: center;
        padding: 8px 5px 8px;
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
        padding: 4px 0 5px;
        text-align: center; 
        font-weight: bold;      
    }

    #imageCont, #tagView{
        margin-top: 10px;
    }

    h2{
        color: #262a52;
        font-weight: 400;
        font-size: 30px;
    }

    p, li{
        font-size: 17px;
    }

    #thirdPart ul{
        padding-left: 20px;
    }

    #thirdPart ul li{
        list-style: none;
        padding-top: 7px;
    }

    #thirdPart, ul{
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-top: 0;
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
            margin-right: 20px;
        }

        #tagView{
            margin-right: 80px;
            padding: 17px 5px 17px;
        }

        #title h1 {
            font-size: 45px;
            color: #262a52;
            margin: 10px 0 10px;
            margin-left: 20px;
        }

        #tag p{
            display: inline-block;
            width: 20%;
            margin: 5px;
            font-size: 13px;
            background-color: #262a52;
            color: white;
            border-radius: 5px;
            min-height: 20px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 120px;
        }
    }
</style>