<template>
  <div class="mx-auto w-full max-w-xs rounded-lg bg-rose-400 text-white mt-16 py-4">
    <div class="text-center">
      <h1 class="my-6 text-4xl">
        Add Song
      </h1>
    </div>
    <form class="text-xl px-4" @submit.prevent="addSong()">
      <label class="block text-left mb-2" for="name">Song name:</label>
      <div class="flex flex-row">
        <input v-model="query" class="w-full py-1 px-3 shadow appearance-none border rounded-tl text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100" required>
        <button @click.prevent="searchSpotify()" type="submit" class="py-1 px-2 shadow appearance-none text-center text-base rounded-tr bg-rose-100 hover:bg-rose-700 active:bg-rose-800">
          🔎
        </button>
      </div>
      <SearchResults :searchResults="searchResults" @handleSelection="updateSelectedTrack"/>
      <button type="submit" class="block py-1 px-2 mt-4 mx-auto text-center text-lg rounded bg-rose-600 hover:bg-rose-700 active:bg-rose-800">
        Add
      </button>
    </form>
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
const selectedTrack = ref(null)


watch(query, (newValue) => {
  if (newValue.trim() === '') {
    query.value = ''
  } else {
    query.value = newValue.trimStart()
  }
})

function searchSpotify () {
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

function updateSelectedTrack (track) {
  query.value = track.name
  selectedTrack.value = track
}

function addSong () {
  let processServerResponse = async (res) => {
    const resData = await res.json()
    if (res.ok) {
      navigateTo('/')
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
</script>

<style scoped>
</style>
