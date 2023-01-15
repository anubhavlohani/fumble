<template>
  <div>
    <div v-if="pending">
      <Spinner />
    </div>
    <div v-else>
      <Stories :stories="data.stories" />
    </div>
  </div>
</template>

<script setup>
const { apiURL } = useRuntimeConfig()

onMounted(() => {
  // verify access token
  let processServerResponse = (res) => {
    if (!res.ok) {
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
