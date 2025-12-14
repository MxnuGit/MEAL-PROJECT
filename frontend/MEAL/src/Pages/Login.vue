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
        <form v-if="activeForm === 'login'" class="Login">
            <ul>
                <li>
                    <img />
                    <input type="text" id="username" name="username" placeholder="Inserisci il nome utente" required>
                </li>
                <li>
                    <img />
                    <input type="text" id="password" name="password" placeholder="Inserisci la Password" required>
                </li>
            </ul>
            <input type="submit" value="Submit">
        </form>

        <!-- SIGN UP -->
        <form v-if="activeForm === 'signup'" class="SignUp">
            <ul>
                <li>
                    <img />
                    <input type="text" id="username" name="username" placeholder="Inserisci il nome utente" required>
                </li>
                <li>
                    <img />
                    <input type="text" id="password" name="password" placeholder="Inserisci la Password" required> 
                </li>
                <li>
                    <img />
                    <input type="text" id="confirm_password" name="confirm_password" placeholder="Conferma Password" required> 
                </li>
            </ul>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>


<script lang="ts">
export default {
  data() {
    return {
      activeForm: "login" as "login" | "signup",
    };
  },
};
</script>

<style>
h1 {
  cursor: pointer;
  opacity: 0.5;
}

h1.active {
  opacity: 1;
  text-decoration: underline;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>