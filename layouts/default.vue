<template>
  <div class="h-screen bg-rose-100">
    <header>
      <ul class="flex flex-row space-x-5 items-center px-5 h-16 w-screen text-xl text-white bg-rose-500">
        <li class="text-3xl"><NuxtLink to="/">Fumble</NuxtLink></li>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/signup">Sign-Up</NuxtLink></li>
      </ul>
    </header>
    <Nuxt />
  </div>
</template>

<style scoped>
</style>
