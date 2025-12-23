<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from "axios";
    import type { User } from "../types";

    export default defineComponent({
        data(){
            return{
                users: null as User | null,
                searchId: ""
            }
        },
        methods:{
            userByID() {
                axios.get("/api/username/" + this.$route.params.username)
                .then(response => {
                    this.users = response.data
                })
            }
        },
        mounted() {
            this.userByID()
        },
    })
</script>

<template>
    <div class="mainContainer">
        <div class="userInfo">
            <img src="../assets/lock.png" />
            <section class="userStats">
                <h1>{{ users?.username }}</h1>
                <div>Like</div>
                <div>1</div>
            </section>
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
        font-size: large;
        font-weight: bold;
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