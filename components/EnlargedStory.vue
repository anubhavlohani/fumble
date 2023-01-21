<template>
  <div class="fixed top-0 left-0 w-full h-full z-50 backdrop-brightness-50">
    <div class="mt-16">
      <button @click="$emit('toggleEnlarged')" class="absolute top-0 right-0 p-4">
        <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="mx-auto flex flex-row justify-center">
        
        <!-- Song Details -->
        <div class="py-8 px-8 w-1/3 flex flex-col gap-y-4 bg-black text-white text-center">
          <a :href="story.track.album.spotify_url" target="_blank" rel="noopener noreferrer" class="w-2/3 mx-auto">
            <img :src="story.track.album.images[0]" :alt="`${story.track.album.name} cover art`" class="rounded-lg transition ease-in-out hover:translate-x-1 hover:-translate-y-1 hover:opacity-80">
          </a>
          <div class="text-lg">
            <a :href="story.track.spotify_url" target="_blank" rel="noopener noreferrer" class="hover:p-1 hover:bg-white hover:text-black">
              {{ story.track.name }}
            </a>
          </div>

          <!-- Main Artist -->
          <Artist :artist="story.track.artists[0]" :enlarged="true" />

          <!-- Featured Artists -->
          <div v-if="story.track.artists.length > 1">
            <p class="text-lg">Feat:</p>
            <div class="flex overflow-x-auto">
              <div v-for="feature in story.track.artists.slice(1,)" :key="feature" class="flex-none py-6 px-3 first:pl-6 last:pr-6">
                <Artist :artist="feature" :enlarged="true" />
              </div>
            </div>
          </div>
        </div>

        <!-- Story Details -->
        <div class="py-4 px-4 w-1/4 flex flex-col gap-y-4 bg-white">
          <div class="flex flex-row gap-x-2">
            <div class="font-medium">{{ story.username }}</div>
            {{ story.caption }}
          </div>
          
          <hr>

          <!-- Comments -->
          <div class="grow flex flex-col gap-y-1">
            <div v-for="comment in story.comments" :key="comment">
              <div class="flex flex-row gap-x-2">
                <div class="font-medium">{{ comment.username }}</div>
                {{ comment.content }}
              </div>
            </div>
          </div>

          <hr>

          <StoryActions :story="story" />
          <!-- Add comment -->
          <form action="post" @submit.prevent="createComment">
            <div class="flex flex-row justify-between">
              <input v-model="comment" type="text" class="outline-none" placeholder="Add a comment...">
              <p v-if="comment === ''" class="text-blue-500 opacity-50 font-medium">Post</p>
              <button type="submit" v-else class="text-blue-500 font-medium">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~~/store/user';

const { story } = defineProps(['story'])
const { apiURL } = useRuntimeConfig()
const currentUser = useUserStore()
const comment = ref('')

watch(comment, (newValue) => {
  if (newValue.trim() === '') {
    comment.value = ''
  } else {
    comment.value = newValue.trimStart()
  }
})

function getComments () {
  let processServerResponse = async (res) => {
    if (res.ok) {
      const resData = await res.json()
      story.comments = resData.comments
    } else {
      return navigateTo('/login')
    }
  }

  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    return navigateTo('/login')
  }

  fetch(`${apiURL}/story-comments?story_id=${story.id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      "ngrok-skip-browser-warning": true
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}

function createComment () {
  let processServerResponse = async (res) => {
    if (res.ok) {
      comment.value = ''
      getComments()
    } else {
      return navigateTo('/login')
    }
  }

  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    return navigateTo('/login')
  }

  const commentData = {
    content: comment.value.trim(),
    user_id: currentUser.user.id,
    story_id: story.id
  }
  fetch(`${apiURL}/post-comment`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": true
    },
    body: JSON.stringify(commentData)
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}
</script>

<style scoped>
* {
  scrollbar-width: thin;
  scrollbar-color: #2b2b2b #000000;
}

::-webkit-scrollbar {
  background: #000000;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #2b2b2b;
  border-radius: 20px;
  border: 4px solid #000000;
}
</style>
