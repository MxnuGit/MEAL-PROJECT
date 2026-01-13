<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";
import type { User, Recipe } from "../types";

export default defineComponent({
  data(){
    return{
      user: null as User | null,
      recipes: [] as Recipe[]
    }
  },
  methods:{
    async getUser() {
      const res = await axios.get("/api/auth/profile")
      this.user = res.data;
    },

    async getMyRecipes() {
      const res = await axios.get("/api/recipes/me");
      this.recipes = res.data;
    },

    async deleteRecipe(recipe_id: number){
      console.log(recipe_id)
      try {
        const response = await axios.delete(`/api/deleteRecipe/${recipe_id}`);
        console.log('Risorsa eliminata:', response.data);
        location.reload();
      } catch (error) {
        console.error('Errore:', error);
      }
    },

    async logout() {
      try {
        await axios.post("/api/auth/logout");
        console.log("Logout effettuato con successo")
        location.href = "/";
      } catch(err) {
        console.log("Devi essere prima registrato")
        console.error(err)
      }
    }
  },
  mounted() {
    this.getUser()
    this.getMyRecipes()
  },
})
</script>

<template>
  <div class="mainContainer">
    <div class="userInfo">
      <img src="../assets/person.png" />
      <section class="userStats">
        <h1>{{ user?.username }}</h1>
      </section>
    </div>

    <header>
      <h2>Le mie ricette</h2>
    </header>

    <div class="MyRecipes">
      <div
        class="Card"
        v-for="recipe in recipes"
        :key="recipe.recipe_id"
      >
        <router-link
          :to="`/RecipeView/${recipe.recipe_id}`"
          class="CardContent"
        >
          <img src="../assets/carbonara.jpg" />
          <h3>{{ recipe.name }}</h3>
        </router-link>

        <form @submit.prevent>
          <input
            @click="deleteRecipe(recipe.recipe_id)"
            type="button"
            id="Remove"
            value="Elimina"
          />
        </form>
      </div>

      <router-link to="/CreateRecipe" class="AddCard">
        <img id="addButton" src="../assets/addButton.png" />
      </router-link>
    </div>

    <div class="logout">
      <input
        type="button"
        id="logoutButton"
        value="Logout"
        @click="logout"
      />
    </div>
  </div>
</template>

<style scoped>
.mainContainer{
  background-color: #DCC9A3;
  border: solid 2.5px white;
  border-radius: 25px;
  width: 80%;
  max-width: 600px;
  margin: 80px auto;
  padding: 10px;
}

.userInfo{
  display: flex;
  flex-direction: row;
  border-bottom: solid white;
}

.userInfo > img{
  width: 20%;
  height: 20%;
  border-radius: 25px;
  padding: 10px;
}

.userStats{
  display: grid;
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.userStats > h1{
  grid-column: span 3;
  text-align: center;
}

header{
  display: flex;
  justify-content: center;
}

h2{
  background-color: #E18727;
  border-radius: 15px;
  padding: 5px;
  color: white;
  text-align: center;
  width: 50%;
}

.MyRecipes{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
}

.Card{
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.CardContent{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.Card img{
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 15px;
}

.Card h3{
  margin: 8px 0;
  text-align: center;
  font-size: 1rem;
}

.Card > form{
  display: flex;
  justify-content: center;
}

.Card > form > input{
  border-radius: 10px;
  border: none;
  font-size: larger;
  font-weight: bolder;
  color: white;
  padding: 5px;
  cursor: pointer;
}

#Remove{
  background-color: #FF3131;
}

.AddCard{
  width: 100%;
  max-width: 250px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.AddCard > img{
  width: 60%;
  cursor: pointer;
}

.logout{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

#logoutButton{
  background-color: red;
  border-radius: 3.5px;
  font-size: large;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: none;
}

@media (max-width: 900px){
    #Remove{
        font-size: medium;
    }

    .CardContent > h3{
        font-size: medium;
    }

    .Card {
        width: 95%;
    }
}
</style>