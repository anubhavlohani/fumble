<template>
  <div class="mx-auto w-full max-w-xs rounded-lg bg-rose-400 text-white mt-16 py-4">
    <div class="text-center">
      <h1 class="my-6 text-4xl">
        Add Song
      </h1>
    </div>
    <form class="text-xl px-4" @submit.prevent="addSong()">
      <div>
        <label class="block text-left mb-2" for="name">Song name:</label>
        <div class="flex flex-row">
          <input v-model="query" class="shadow appearance-none border rounded w-full mb-4 mr-1 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100" required>
          <button @click.prevent="searchSpotify()" type="submit" class="shadow appearance-none text-center text-base mb-4 ml-1 py-1 px-2 rounded bg-rose-600 hover:bg-rose-700 active:bg-rose-800">
            🔎
          </button>    
        </div>
      </div>
      <button type="submit" class="block mx-auto text-center text-lg py-1 px-2 rounded bg-rose-600 hover:bg-rose-700 active:bg-rose-800">
        Add
      </button>
    </form>
    <ul v-if="searchResults.length > 0">
      <li v-for="track in searchResults" :key="track">
        {{ track.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const { apiURL } = useRuntimeConfig()

// check if token is valid
onMounted(() => {
  let processServerResponse = (res) => {
    if (!res.ok) {
      alert(res.statusText)
      navigateTo('/login')
    }
  }

  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    navigateTo('/login')
  }
  fetch(`${apiURL}/verify-token`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
})


const query = ref('')
const searchResults = ref([])


watch(query, (newValue) => {
  if (newValue.trim() === '') {
    query.value = ''
  } else {
    query.value = newValue.trimStart()
  }
})

function searchSpotify() {
  let processServerResponse = async (res) => {
    const resData = await res.json()
    if (res.ok) {
      searchResults.value = resData.results
    } else {
      alert(resData.detail)
    }
  }

  let url = `${apiURL}/search-spotify?q=${query.value}`
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}

function addSong() {
  return null
}
</script>

<style scoped>
</style>
