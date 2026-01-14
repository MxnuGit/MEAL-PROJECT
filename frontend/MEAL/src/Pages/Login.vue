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
                    <img src="../assets/user_blank.png"/>
                    <input type="text" id="username" name="username" placeholder="Inserisci il nome utente" v-model="login.username" required>
                </li>
                <li>
                    <img src="../assets/lock.png" />
                    <input type="password" id="password" name="password" placeholder="Inserisci la Password" v-model="login.password" required>
                </li>
                <p v-if="loginError" class="error">ID utente o password errata, riprovare</p>
                <li>
                  <input type="submit" value="Submit" id="submit"></input>
                </li>
            </ul>
        </form>

        <!-- SIGN UP -->
        <form v-if="activeForm === 'signup'" class="SignUp" @submit.prevent="handleSignUp">
            <ul>
                <li>
                    <img src="../assets/user_blank.png"/>
                    <input type="text" id="username" name="username" placeholder="Inserisci il nome utente" v-model="signup.username" required>
                </li>
                <li>
                    <img src="../assets/lock.png"/>
                    <input type="password" id="password" name="password" placeholder="Inserisci la Password" v-model="signup.password" required> 
                </li>
                <li>
                    <img src="../assets/lock.png"/>
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="Conferma Password" v-model="signup.confPassword" required> 
                </li>
                <p v-if="signUpError" class="error">ID utente già esistente o le password non combaciano, riprovare</p>
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
        },
        signUpError: false,
        loginError: false,
      };
    },
    methods: {
      async handleSignUp() {
        if(this.signup.password != this.signup.confPassword){
          console.log("Le password non combaciano...");
          this.signUpError = true
          return;
        }

        try {
          const res = await axios.post("/api/auth/register", {
            username: this.signup.username,
            password: this.signup.password
          });
          location.href = "/";
          console.log("Risposta backend:", res.data);
        } catch (err) {
          console.log("Errore di connessione al server");
          this.signUpError = true
        }
      },

      async handleLogin() {
        try {
          const res = await axios.post("/api/auth/login", {
            username: this.login.username,
            password: this.login.password
          });
          location.href = "/";
          console.log("Risposta backend:", res.data);
        } catch (err) {
          console.log("Errore di connessione al server");
          this.loginError = true
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

    width: 80%;
    max-width: 600px;

    margin: 80px auto;
    padding: 10px;
  }

  header{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  form{
    display: flex;
    justify-content: center;
  }
  
  h1 {
    cursor: pointer;
    color: white;
    width: 50%;
    text-align: center;
  }

  h1.active {
    opacity: 1;
    border-bottom: solid #1D2B65;
    color: #1D2B65;
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

  li{
    display: flex;
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
    cursor: pointer;
  }

  #submit:hover{
    background-color: white;
    border: 1.5px solid white;
    color: #1D2B65;
  }

  img{
    max-width: 30px;
    width: 100%;
    max-height: 30px;
    height: 100%;
    margin-right: 10px;
  }

  .error{
    background-color: red;
    color: white;
    padding: 6px;
    font-size: 11px;
    border-radius: 20px;
    text-align: center;
  }
</style>