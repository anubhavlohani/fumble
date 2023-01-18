<template>
  <div class="mt-16 py-4 mx-auto w-full max-w-xs rounded-lg border-2 shadow-lg">
    <div class="text-center">
      <h1 class="my-6 text-4xl">
        Sign-Up
      </h1>
    </div>
    <form class="text-xl px-4" @submit.prevent="signUp()">
      <div>
        <label class="block text-left mb-2" for="name">Name:</label>
        <input v-model="name" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        <ul v-if="nameErrors.length > 0">
          <li v-for="error in nameErrors" :key="error" class="text-base text-gray-700">
            {{ error }}
          </li>
        </ul>
      </div>
      <div>
        <label class="block text-left mb-2" for="username">Username:</label>
        <input v-model="username" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        <ul v-if="usernameErrors.length > 0">
          <li v-for="error in usernameErrors" :key="error" class="text-base text-gray-700">
            {{ error }}
          </li>
        </ul>
      </div>
      <div>
        <label class="block text-left mb-2" for="email">Email:</label>
        <input v-model="email" type="email" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div>
        <label class="block text-left mb-2" for="password">Password:</label>
        <input v-model="password" type="password" class="shadow appearance-none border rounded w-full mb-4 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        <ul v-if="passwordErrors.length > 0">
          <li v-for="error in passwordErrors" :key="error" class="text-base text-gray-700">
            {{ error }}
          </li>
        </ul>
      </div>
      <button type="submit" class="block mx-auto py-2 px-4 text-center text-lg rounded text-white bg-black hover:bg-gray-700 active:bg-gray-800">
        Sign Up
      </button>
      <p class="pt-4 text-base text-center hover:text-blue-800">
        <a href="/login">Already a user? <i>Login</i> instead</a>
      </p>
      <p v-if="nameErrors.length > 0 || usernameErrors.length > 0 || passwordErrors.length > 0">
        Invalid Input
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const { apiURL } = useRuntimeConfig()

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
  const re = /^[a-zA-Z ]+$/

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
  if (name.value.trim() === '') {
    nameErrors.value = []
  } else {
    verifyName(name.value)
  }
})
watch(username, (newValue) => {
  if (username.value.trim() === '') {
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

async function signUp () {
  let processServerResponse = async (res) => {
    if (res.ok) {
      return navigateTo('/login')
    } else {
      const resData = await res.json()
      alert(resData.detail)
    }
  }
  
  const userData = {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value
  }
  fetch(`${apiURL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": true
    },
    body: JSON.stringify(userData),
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}
</script>

<style scoped>
</style>
