<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from "axios";
    import type { User } from "../types";

    export default defineComponent({
        data(){
            return{
                users: null as User | null
            }
        },
        methods:{
            getUserName() {
                axios.get("/api/user/" + this.$route.params.username)
                .then(response => this.users = response.data)
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
            <h2 v-if="users">{{ users.username }}</h2>
        </section>
        <section class="myRecipes">

        </section>
        <section class="myFavourites">

        </section>
    </div>
</template>