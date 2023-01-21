<template>
  <div class="fixed top-0 left-0 w-full h-full z-50 backdrop-brightness-50">
    <div class="mt-16">
      <button @click="$emit('toggleEnlarged')" class="absolute top-0 right-0 p-4">
        <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="mx-auto flex flex-row justify-center">
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



        <div class="md:text-lg bg-white">
          {{ story.track.album.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { story } = defineProps(['story'])
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
