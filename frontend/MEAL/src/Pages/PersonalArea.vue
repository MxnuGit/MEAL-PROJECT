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
    <div>
        <img src="../assets/lock.png" />
        <section class="">
            <h1>User Name</h1>
            <ul>
                <li>
                    Like
                </li>
                <li>
                    Follower
                </li>
                <li>
                    Seguiti
                </li>
            </ul>
            <ul>
                <li>
                    1
                </li>
                <li>
                    1
                </li>
                <li>
                    1
                </li>
            </ul>
        </section>
        <section class="myRecipes">

        </section>
        <section class="myFavourites">

        </section>
    </div>
</template>

<style scoped>
    div{
        background-color: #DCC9A3;
    }
</style>