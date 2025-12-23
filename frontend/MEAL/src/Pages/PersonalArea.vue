<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from "axios";
    import type { User } from "../types";

    export default defineComponent({
        data(){
            return{
                activeViewRecipe: "myRecipe" as "myRecipe" | "favourites",
                user: null as User | null
            }
        },
        methods:{
            async getUser() {
                const res = await axios.get("/api/auth/profile")
                this.user = res.data;
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
        },
    })
</script>

<template>
    <div class="mainContainer">
        <div class="userInfo">
            <img src="../assets/lock.png" />
            <section class="userStats">
                <h1>{{ user?.username }}</h1>
                <div>Like</div>
                <div>Follower</div>
                <div>Seguiti</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </section>
        </div>
        <header>
            <h2 :class="{ active: activeViewRecipe === 'myRecipe' }"
            @click="activeViewRecipe = 'myRecipe'">Le mie ricette</h2>
            <h2 :class="{ active: activeViewRecipe === 'favourites' }"
            @click="activeViewRecipe = 'favourites'">Preferiti</h2>
        </header>
        <div class="logout">
            <input type="button" id="logoutButton" value="Logout" @click="logout">
        </div>
    </div>
</template>

<style scoped>
    .mainContainer{
        background-color: #DCC9A3;

        border: solid px white;
        border-radius: 25px;
        
        width: 100%;
        max-width: 600px;

        margin: 80px auto;
        padding: 10px;
    }

    img{
        max-width: 200px;
        max-height: 150px;
        border-radius: 25px;
        padding: 10px;
    }

    .userInfo{
        display: flex;
        flex-direction: row;
        border-bottom: solid white;
    }

    .userStats{
        display: grid;
        text-align: center;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        height: auto;
    }

    .userStats > h1{
        grid-column: span 3;
        text-align: center;
    }

    .userStats > div{
        color: white;
    }
    
    header{
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    h2{
       background-color: white; 
       border-radius: 15px;
       padding: 5px;
       color: #2D2C53;
       cursor: pointer;
       
       text-align: center;
       width: 50%;
    }

    h2.active{
        background-color: #E18727;
        color: white;
    }

    .logout{
        width: 100%;
        display: flex;
        justify-content: right;
    }

    #logoutButton{
        border: red;
        background-color: red;
        border-radius: 3.5px;

        font-size: large;
        font-weight: bold;
        color: white;

        cursor: pointer;
    }
</style>