<script setup lang="ts">
</script>

<template>
  <aside>
    <section id="imgSec">
      <router-link to="/">
        <img src="./assets/logo.png" alt="home" />
      </router-link>
      <hr/>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/">
            <img src="./assets/home-icon.png" alt="" />
            <p>Home</p>
          </router-link>
        </li>
        <li>
          <router-link to="/Users">
            <img src="./assets/Chef-hat.png" alt="" />
            <p>Trova lo Chef</p>
          </router-link>
        </li>
      </ul>
      <hr/>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/PersonalArea">
            <img src="./assets/person.png" alt="" />
            <p>Area Personale</p>
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/Login">
            <img src="./assets/login.png" alt="" />
            <p>Login</p>
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/CreateRecipe">
            <p>Crea Ricetta</p>
          </router-link>
        </li>
      </ul>
    </section>
  </aside>
  <main>
    <router-view />
  </main>

</template>
