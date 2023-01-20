<template>
  <div>
    <div v-if="pending">
      <Spinner />
    </div>
    <div v-else>
      <div v-for="story in data.stories" :key="story">
        <Story :story="story" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~~/store/user';

const { apiURL } = useRuntimeConfig()
const currentUser = useUserStore()

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

const { pending, data } = useAsyncData('stories', () => $fetch(`${apiURL}/all-stories`, {
  headers: {
    "ngrok-skip-browser-warning": true
  }
}))
</script>

<style scoped>
</style>
