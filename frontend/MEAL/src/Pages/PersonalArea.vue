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
        <section>
            <img />
            <h2 v-if="user">{{ user.username }}</h2>
        </section>
        <section class="myRecipes">

        </section>
        <section class="myFavourites">

        </section>
    </div>
</template>