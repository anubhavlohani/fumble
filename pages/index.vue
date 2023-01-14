<template>
  <div>
    <div v-if="!pending">
      <div v-for="story in data.stories" :key="story">
        <Story :story="story"/>
      </div>
    </div>
    <div v-else>
      <h1>Loading Data</h1>
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
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
})

const { pending, data } = useAsyncData('stories', () => $fetch(`${apiURL}/all-stories`))
</script>

<style scoped>
</style>
