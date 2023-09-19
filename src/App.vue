<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-gray-100">
    <header class="bg-black p-4">
      <nav class="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <!-- logo -->
        <h1 class="text-2xl font-bold text-white mb-4 md:mb-0 font-serif">Y</h1>
        <div class="flex space-x-4">
          <RouterLink to="/" class="text-white hover:text-gray-200">Home</RouterLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto mt-8 px-3">
      <RouterView />
    </main>
  </div>
</template>

