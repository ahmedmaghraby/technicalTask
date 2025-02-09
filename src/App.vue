<template>
  <div id="app">
    <Analytics mode="production" />
    <Navbar />
    <main class="min-h-screen pt-20 bg-slate-100 dark:bg-gray-800">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
</script>
 