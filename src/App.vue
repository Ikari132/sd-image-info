<script setup>
import { RouterView } from "vue-router";
import MainFooter from "./components/MainFooter.vue";
import MainHeader from "./components/MainHeader.vue";
</script>

<template>
  <MainHeader />

  <main class="flex flex-col items-center my-10">
    <div class="w-full h-full max-w-screen-lg">
      <RouterView />
    </div>
  </main>

  <MainFooter />
</template>
