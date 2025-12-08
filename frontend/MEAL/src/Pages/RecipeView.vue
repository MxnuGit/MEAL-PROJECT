<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios'
    import { Ricetta } from "../types"
    
    export default defineComponent({
        data() {
            return {
                ricetta: 
            }
        }
    })
</script>

<template>
    <div id="container">
        <h1>{{ ricetta.titolo }}</h1>
    </div>
</template>