<template>
    <div>
        <header>
            <h1 
            :class="{ active: activeForm === 'login' }"
            @click="activeForm = 'login'">Login</h1>
            <h1 
            :class="{ active: activeForm === 'signup' }"
            @click="activeForm = 'signup'">Sign Up</h1>
        </header>

        <!-- LOGIN -->
        <form v-if="activeForm === 'login'" class="Login" @submit.prevent="handleLogin">
            <ul>
                <li>
                    <img />
                    <input type="text" id="username" name="username" placeholder="Inserisci il nome utente" v-model="login.username" required>
                </li>
                <li>
                    <img />
                    <input type="password" id="password" name="password" placeholder="Inserisci la Password" v-model="login.password" required>
                </li>
                <li>
                  <input type="submit" value="Submit" id="submit"></input>
                </li>
            </ul>
        </form>

        <!-- SIGN UP -->
        <form v-if="activeForm === 'signup'" class="SignUp" @submit.prevent="handleSignUp">
            <ul>
                <li>
                    <img />
                    <input type="text" id="username" name="username" placeholder="Inserisci il nome utente" v-model="signup.username" required>
                </li>
                <li>
                    <img />
                    <input type="text" id="password" name="password" placeholder="Inserisci la Password" v-model="signup.password" required> 
                </li>
                <li>
                    <img />
                    <input type="text" id="confirm_password" name="confirm_password" placeholder="Conferma Password" v-model="signup.confPassword" required> 
                </li>
                <li>
                  <input type="submit" value="Submit" id="submit"></input>
                </li>
            </ul>
        </form>
    </div>
</template>


<script lang="ts">
  import axios from 'axios'

  export default {
    data() {
      return {
        activeForm: "login" as "login" | "signup",
        signup: {
          username: "",
          password: "",
          confPassword: ""
        },
        login: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
      async handleSignUp() {
        if(this.signup.password != this.signup.confPassword){
          console.log("Le password non combaciano...");
          return;
        }

        try {
          const res = await axios.post("/api/auth/register", {
            username: this.signup.username,
            password: this.signup.password
          });

          console.log("Risposta backend:", res.data);

          if (res.data.success) {
            console.log("Registrazione completata!");
          } else {
            console.log("Errore: " + res.data.message);
          }
        } catch (err) {
          console.error(err);
          console.log("Errore di connessione al server");
        }
      },

      async handleLogin() {
        try {
          const res = await axios.post("/api/auth/login", {
            username: this.login.username,
            password: this.login.password
          });

          console.log("Risposta backend:", res.data);
        } catch (err) {
          console.error(err);
          console.log("Errore di connessione al server");
        }
      }
    }
  };
  </script>

  <style scoped>  
  div{
    background-color: #DCC9A3;

    border-radius: 10px;
    border-color: white;
    border: 2.5px solid white;

    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 600px;

    margin: 80px auto;
    padding: 10px;
  }

  header{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  }

  form{
    display: flex;
    justify-content: center;
  }
  
  h1 {
    cursor: pointer;
    opacity: 0.5;
  }

  h1.active {
    opacity: 1;
    border-bottom: solid black;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center; 
    gap: 12px;
  }

  input {
    width: 100%;
    max-width: 240px;
    
    padding: 8px;
    box-sizing: border-box;

    border-radius: 10px;
    border: 1.5px solid white;

    font-weight: bold;
  }

  #submit{
    background-color: #1D2B65;
    border: 1.5px solid #1D2B65;
    color: white;
  }

  #submit:hover{
    background-color: white;
    border: 1.5px solid white;
    color: #1D2B65;
  }
</style>