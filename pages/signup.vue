<template>
  <div class="mx-auto w-full max-w-xs rounded-lg bg-rose-400 text-white mt-16 py-4">
    <div class="text-center">
      <h1 class="my-6 text-4xl">
        Sign-Up
      </h1>
    </div>
    <div class="my-4">
      <form class="text-xl px-4" @submit.prevent="signUp()">
        <div>
          <label class="block text-left mb-2" for="name">Name:</label>
          <input v-model="name" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100" required>
          <ul v-if="nameErrors.length > 0">
            <li v-for="error in nameErrors" :key="error" class="text-base text-gray-700">
              {{ error }}
            </li>
          </ul>
        </div>
        <div>
          <label class="block text-left mb-2" for="username">Username:</label>
          <input v-model="username" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100" required>
          <ul v-if="usernameErrors.length > 0">
            <li v-for="error in usernameErrors" :key="error" class="text-base text-gray-700">
              {{ error }}
            </li>
          </ul>
        </div>
        <div>
          <label class="block text-left mb-2" for="email">Email:</label>
          <input v-model="email" type="email" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100" required>
        </div>
        <div>
          <label class="block text-left mb-2" for="password">Password:</label>
          <input v-model="password" type="password" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100" required>
          <ul v-if="passwordErrors.length > 0">
            <li v-for="error in passwordErrors" :key="error" class="text-base text-gray-700">
              {{ error }}
            </li>
          </ul>
        </div>
        <button type="submit" class="text-center text-lg py-1 px-2 rounded bg-rose-600 hover:bg-rose-700 active:bg-rose-800">
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')

const nameErrors = ref([])
const usernameErrors = ref([])
const passwordErrors = ref([])

function verifyName (name) {
  let validName = true
  nameErrors.value = []
  const re = /^[a-zA-Z]+$/

  if (!re.test(name)) {
    validName = false
    nameErrors.value.push('Name can only contain alphabets')
  }

  return validName
}

function verifyUsername (username) {
  let validUsername = true
  usernameErrors.value = []

  let re = /[^\w+]/ // anything other than a-z A-Z 0-9 _
  if (re.test(username)) {
    validUsername = false
    usernameErrors.value.push('Username can only contain alphabets, numbers and _')
  }

  re = /^[0-9_]/ // starting with 0-9 or _
  if (re.test(username)) {
    validUsername = false
    usernameErrors.value.push('Username cannot start with a number or _')
  }

  if (username.length < 6 || username.length > 30) {
    validUsername = false
    usernameErrors.value.push('Username must be 6-30 characters long')
  }

  return validUsername
}

function verifyPassword (password) {
  let validPassword = true
  passwordErrors.value = []

  const re1 = /[a-zA-Z]/
  const re2 = /[0-9]/
  if (!re1.test(password) || !re2.test(password)) {
    validPassword = false
    passwordErrors.value.push('Password must contain at least one alphabet and one number')
  }

  if (password.length < 8) {
    validPassword = false
    passwordErrors.value.push('Password must contain at least 8 characters')
  }

  return validPassword
}

watch(name, (newValue) => {
  name.value = newValue.trim()
  if (name.value === '') {
    nameErrors.value = []
  } else {
    verifyName(name.value)
  }
})
watch(username, (newValue) => {
  username.value = newValue.trim()
  if (username.value === '') {
    usernameErrors.value = []
  } else {
    verifyUsername(username.value)
  }
})
watch(password, (newValue) => {
  if (password.value === '') {
    passwordErrors.value = []
  } else {
    verifyPassword(password.value)
  }
})
</script>

<style scoped>
</style>