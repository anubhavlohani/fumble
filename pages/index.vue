<template>
  <div>
    <div v-if="stories.length > 0">
      <div v-for="story in stories" :key="story">
        <Story :story="story" />
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~~/store/user';

const { apiURL } = useRuntimeConfig()
const currentUser = useUserStore()
const stories = ref([])

onBeforeMount(() => {
  // verify access token
  let processServerResponse = async (res) => {
    if (res.ok) {
      const resData = await res.json()
      currentUser.user = resData.user_details
    } else {
      return navigateTo('/login')
    }
  }

  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    return navigateTo('/login')
  }
  fetch(`${apiURL}/verify-token`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      "ngrok-skip-browser-warning": true
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
})

onMounted(() => {
  let processServerResponse = async (res) => {
    if (res.ok) {
      const resData = await res.json()
      stories.value = resData.stories
    } else {
      return navigateTo('/login')
    }
  }

  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    return navigateTo('/login')
  }
  fetch(`${apiURL}/all-stories`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      "ngrok-skip-browser-warning": true
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
})
</script>

<style scoped>
</style>
