

<template>
  <header class="flex items-center justify-center bg-white border-b dark:bg-gray-800">
    <div class="container px-2 mx-auto">
      <div class="flex flex-wrap items-center justify-between gap-3 py-5">
        <h1 class="text-3xl font-light text-primary dark:text-white">{{appName}}</h1>
        <div class="flex items-center justify-end gap-3">
        <button class="flex items-center justify-center w-9 h-9 focus:outline-none" @click="toggle()">
          <MdiWhiteBalanceSunny v-if="isDark" class="text-yellow-500" />
          <MdiMoonWaningCrescent v-else class="text-gray-800" />
        </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME
const isDark = useDark()
const toggle = useToggle(isDark)
</script>