<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from "axios";
    import type { Utente } from "../types";

    export default defineComponent({
        data(){
            return{
                utente: null as Utente | null
            }
        },
        methods:{
            getUserName() {
                axios.get("/api/utente/" + this.$route.params.ID)
                .then(response => this.utente = response.data)
            }
        },
        mounted() {
            this.getUserName()
        },
    })
</script>

<template>
    <div>
        <section>
            <img />
            <h2 v-if="utente">{{ utente.ID }}</h2>
        </section>
        <section class="myRecipes">

        </section>
        <section class="myFavourites">

        </section>
    </div>
</template>