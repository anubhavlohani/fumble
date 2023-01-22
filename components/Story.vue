<template>
  <div class="my-12 mx-auto w-10/12 md:w-full max-w-md flex flex-col text-center rounded-lg bg-zinc-100 text-white">
    <!-- Album details -->
    <div class="py-4 px-4 mx-auto w-10/12">
      <div class="gap-y-4 flex flex-col">
        <a :href="story.track.album.spotify_url" target="_blank" rel="noopener noreferrer" class="w-11/12 mx-auto">
          <img :src="story.track.album.images[1]" :alt="`${story.track.album.name} cover art`" class="mx-auto rounded-lg transition ease-in-out hover:translate-x-1 hover:-translate-y-1 hover:opacity-80">
        </a>
        <div class="md:text-lg text-black">
          {{ story.track.album.name }}
        </div>
      </div>
      <audio v-if="story.track.preview_url" :src="story.track.preview_url" class="w-full mx-auto" controls></audio>
    </div>
    
    <!-- Song details -->
    <div class="py-4 px-2 rounded-t-lg bg-black">
      <div class="text-lg">
        <a :href="story.track.spotify_url" target="_blank" rel="noopener noreferrer" class="hover:p-1 hover:bg-white hover:text-black">
          {{ story.track.name }}
        </a>
      </div>
      
      <!-- Main Artist -->
      <Artist :artist="story.track.artists[0]" class="py-2" />
      
      <!-- Featured Artists -->
      <div v-if="story.track.artists.length > 1">
        <p class="text-xl">Feat:</p>
        <div class="flex overflow-x-auto dark-scrollbar">
          <div v-for="feature in story.track.artists.slice(1,)" :key="feature" class="flex-none p-2 first:pl-6 last:pr-6">
            <Artist :artist="feature" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Story deatils -->
    <div class="py-2 px-4 text-left rounded-b-lg bg-black">
      <StoryActions :story="story" :fetchedComments="fetchedComments" :bgColor="'black'" @toggleEnlarged="enlargeStory" />     
      <div class="font-semibold">
        {{ story.username }}
      </div>
      <div>
        {{ story.caption }}
      </div>
    </div>
  </div>

  <EnlargedStory v-if="showEnlarged" :story="story" :comments="comments" :fetchedComments="fetchedComments" @toggleEnlarged="showEnlarged = false" />
</template>

<script setup>
const { story } = defineProps(['story'])
const { apiURL } = useRuntimeConfig()
const comments = ref([])
const fetchedComments = ref(false)
const showEnlarged = ref(false)

function enlargeStory () {
  let processServerResponse = async (res) => {
    if (res.ok) {
      const resData = await res.json()
      comments.value = resData.comments
      fetchedComments.value = true
    } else {
      return navigateTo('/login')
    }
  }

  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    return navigateTo('/login')
  }
  showEnlarged.value = true
  fetch(`${apiURL}/story-comments?story_id=${story.id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      "ngrok-skip-browser-warning": true
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}
</script>
