<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import type { User } from '../types';
    
    export default defineComponent({
        data() {
            return {
              users: [] as User[],
              searchId: ""
            }
        },
        methods: {
            userByID() {
                if(this.searchId == "") return;
                else{
                    axios.get("/api/user/" + this.searchId)
                    .then(response => this.users = response.data)
                }
            }
        }
    })
</script>

<template>
    <form @submit.prevent="userByID">
        <input type="text"
               v-model="searchId"
               placeholder="Cerca un utente"
               id="findUser"
               minlength="2"
               maxlength="20"
               required>
        <button type="submit" id="findButton">Cerca</button>
    </form>

    <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user.username" id="userItemList">
            {{ user.username }}
        </li>
    </ul>
</template>

<style scoped>
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    #findUser{
        width: 600px;
        height: 35px;
        font-size: 20px;
        border-radius: 10px;
        text-align: center;
    }

    #userItemList{
        background-color: #DCC9A3;
        border-radius: 6px;
    }

    #findButton {
        width: 70px;
        height: 40px;
        font-size: 15px;
        border-radius: 10px;
        background-color: orange;
        font-weight: bold;
    }
</style>