<template>
  <div>
    <div v-if="pending">
      <Spinner />
    </div>
    <div v-else>
      <div v-for="story in data.stories" :key="story">
        <Story :story="story" @updateCurrentStory="updateCurrentStory"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrentStoryStore } from '~~/store/story';

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

const currentStory = useCurrentStoryStore()
const previewAudio = ref(null)

function updateCurrentStory (story) {
  if (currentStory.story === null || currentStory.story.track.id !== story.track.id) {
    if (previewAudio.value) {
      previewAudio.value.pause()
    }
    currentStory.story = story
    currentStory.playingPreview = true
    previewAudio.value = currentStory.getPreviewAudio()
    previewAudio.value.play()
  } else {
    if (currentStory.playingPreview) {
      currentStory.playingPreview = false
      previewAudio.value.pause()
    } else {
      currentStory.playingPreview = true
      previewAudio.value.play()
    }
  }
}
</script>

<style scoped>
</style>
