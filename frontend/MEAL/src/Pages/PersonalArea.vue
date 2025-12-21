<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from "axios";
    import type { User } from "../types";

    export default defineComponent({
        data(){
            return{
                user: null as User | null
            }
        },
        methods:{
            getUserName() {
                axios.get("/api/user/" + this.$route.params.username)
                .then(response => this.user = response.data)
            }
        },
        mounted() {
            this.getUserName()
        },
    })
</script>

<template>
    <div class="mainContainer">
        <img src="../assets/lock.png" />
        <section class="">
            <h1>User Name</h1>
            <div class="stats">
                <ul class="labels">
                    <li>Like</li>
                    <li>Follower</li>
                    <li>Seguiti</li>
                </ul>
                <ul class="values">
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                </ul>
            </div>
        </section>
        <section class="myRecipes">

        </section>
        <section class="myFavourites">

        </section>
    </div>
</template>

<style scoped>
    .mainContainer{
        background-color: #DCC9A3;
        display: flex;
        flex-direction: row;
    }

    img{
        max-width: 100px;
        width: 100%;

        max-height: 120px;
        height: 100%;
    }

    .stats {
        display: grid;
        grid-template-rows: auto auto;
    }

    .labels,
    .values {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: center;
    }
</style>