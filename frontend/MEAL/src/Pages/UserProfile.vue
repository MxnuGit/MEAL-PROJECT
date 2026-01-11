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
    userByID() {
      axios.get("/api/username/" + this.$route.params.username)
      .then(response => {
        this.user = response.data[0]
        console.log(this.user?.username)
      })
    },

    async getUserRecipes() {
      const username = this.$route.params.username;
      const res = await axios.get(`/api/users/${username}/recipes`);
      this.recipes = res.data;
    }
  },

  mounted() {
    this.userByID()
    this.getUserRecipes()
  },
})
</script>

<template>
  <div class="mainContainer">
    <div class="userInfo">
      <img src="../assets/lock.png" />
      <section class="userStats">
        <h1>{{ user?.username }}</h1>
      </section>
    </div>

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
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainContainer{
  background-color: #DCC9A3;
  border: solid 2.5px white;
  border-radius: 25px;
  width: 100%;
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

.MyRecipes{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;             
  justify-items: center;
  margin-top: 15px;
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
</style>
