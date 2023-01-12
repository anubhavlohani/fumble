<template>
  <div>
    <header>
      <ul class="px-5 h-16 w-screen flex flex-row space-x-5 items-center text-xl text-white shadow-xl bg-blue-600">
        <li class="text-3xl"><NuxtLink to="/">XYZ</NuxtLink></li>
        <li class=""><NuxtLink to="/">Home</NuxtLink></li>
        <li class=""><NuxtLink to="/signup">Signup</NuxtLink></li>
        <li class=""><NuxtLink to="/login">Login</NuxtLink></li>
        <li class=""><NuxtLink to="/profile">Profile</NuxtLink></li>
      </ul>
    </header>

    <slot />
  </div>
</template>

<style scoped>
</style>
