<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

let route = useRoute();
const default_layout = "default"
const isRouterAlive = true
const layout = computed(() => {
  return (route.meta.layout || default_layout) + '-layout'
})
</script>

<template>
  <div id="app">
    <component :is="layout">
      <router-view v-if="isRouterAlive"/>
    </component>
  </div>
</template>

<style scoped>

</style>
