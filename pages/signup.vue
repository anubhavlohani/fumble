<template>
  <div class="mx-auto w-full max-w-xs rounded-lg bg-pink-500 text-white mt-16 py-4">
    <div class="text-center">
      <h1 class="my-6 text-4xl">
        Sign-Up
      </h1>
    </div>
    <div class="my-4">
      <form class="text-xl px-4">
        <label class="block text-left mb-2" for="name">Name:</label>
        <input v-model="name" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-100" required>
        <label class="block text-left mb-2" for="username">Username:</label>
        <input v-model="username" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-100" required>
        <label class="block text-left mb-2" for="email">Email:</label>
        <input v-model="email" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-100" required>
        <label class="block text-left mb-2" for="password">Password:</label>
        <input v-model="password" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-100" required>
        <button type="submit" class="text-center text-lg py-1 px-2 rounded bg-pink-600 hover:bg-pink-700 active:bg-pink-800">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const name = ''
const username = ''
const email = ''
const password = ''
</script>

<style scoped>
</style>
