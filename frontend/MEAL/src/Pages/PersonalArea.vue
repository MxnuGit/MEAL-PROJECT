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
        <div class="userInfo">
            <img src="../assets/lock.png" />
            <section class="userStats">
                <h1>User Name</h1>
                <div>Like</div>
                <div>Follower</div>
                <div>Seguiti</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </section>
        </div>
        <div>

        </div>
    </div>
</template>

<style scoped>
    .mainContainer{
        background-color: #DCC9A3;
        margin: 10px;
        border: solid 10px white;
        border-radius: 25px;
        max-width: fit-content;
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
</style>