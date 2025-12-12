<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    
    export default defineComponent({

    })
</script>

<template>
    <div id="container">
        <header>
            <h1>Crea La Tua Ricetta</h1>
        </header>
        <hr>
        <form action="submit">
            <label for="">Nome della Ricetta</label>
            <input type="text">
            <div>
                <section id="difficulty">
                    <h4>Difficoltà</h4>
                    <select name="difficulty" id="selectDifficulty">
                        <option value="easy">Facile</option>
                        <option value="medium">Media</option>
                        <option value="hard">Difficile</option>
                    </select>
                </section>
                <section id="time">
                    <h4>Tempo</h4>
                    <input type="text" placeholder="120...">
                </section>
            </div>
            <div>
                <section id="ingredients">
                    <h4>Ingredienti</h4>
                    <input type="text">
                </section>
                <section id="quantity">
                    <h4>Quantità</h4>
                    <input type="text">
                </section>
                <section id="unitMisure"> <!-- da fare poi la query qui-->
                    <h4>Unità di misura</h4>
                    <input type="text">
                </section>
            </div>
        </form>
    </div>
</template>