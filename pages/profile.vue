<template>
  <div class="mt-16 py-4 mx-auto w-full max-w-xs border-2 rounded-lg shadow-lg">
    <div class="text-center">
      <h1 class="my-6 text-4xl">
        Create Story
      </h1>
    </div>
    <form class="px-4 text-xl" @submit.prevent="createStory">
      <label class="block mb-1 text-left" for="name">Search song:</label>
      <div class="flex flex-row">
        <input v-model="query" :class="{ 'rounded-bl': searchResults.length === 0 }" class="w-full py-1 px-3 shadow appearance-none border rounded-tl text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Pray for me" required>
        <button @click.prevent="searchSpotify" type="submit" :class="{ 'rounded-br': searchResults.length === 0 }" class="py-1 px-2 shadow appearance-none text-center text-base rounded-tr hover:bg-black active:bg-gray-700">
          🔎
        </button>
      </div>
      <SearchResults :searchResults="searchResults" @handleSelection="updateSelectedTrack"/>
      <label class="block mt-4 mb-1 text-left" for="caption">Caption:</label>
      <input v-model="caption" class="w-full py-1 px-3 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Add some caption here">
      <button type="submit" class="block mx-auto mt-4 py-2 px-4 text-center text-lg rounded text-white bg-black hover:bg-gray-700 active:bg-gray-800">
        Create
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from '~~/store/user';

const { apiURL } = useRuntimeConfig()
const currentUser = useUserStore()

// on page load: check if token is valid
onMounted(() => {
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


const query = ref('')
const caption = ref('')
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
      "ngrok-skip-browser-warning": true
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}

function updateSelectedTrack (track) {
  query.value = track.name
  selectedTrack.value = track
}

function createStory () {
  let processServerResponse = async (res) => {
    const resData = await res.json()
    if (res.ok) {
      alert('Successfully created your story')
      return navigateTo('/')
    } else {
      alert(resData.detail)
    }
  }

  const storyData = {
    track_id: selectedTrack.value.id,
    caption: caption.value
  }
  fetch(`${apiURL}/create-story`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": true
    },
    body: JSON.stringify(storyData)
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}
</script>

<style scoped>
::placeholder {
  font-style: italic;
  color: #9ca3af;
  font-size: 0.85em;
}
</style>
