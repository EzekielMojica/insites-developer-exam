<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-blue-500 p-4">
    <nav class="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <h1 class="text-2xl font-semibold text-white mb-4 md:mb-0">My Blog</h1>
      <div class="flex space-x-4">
        <RouterLink to="/" class="text-white hover:text-gray-200">Home</RouterLink>
        <RouterLink to="/about" class="text-white hover:text-gray-200">About</RouterLink>
      </div>
    </nav>
  </header>
  <main class="container mx-auto mt-8">
    <RouterView />
  </main>
</template>

