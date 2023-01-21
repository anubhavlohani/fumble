<template>
  <div class="fixed top-0 left-0 w-full h-full z-50 backdrop-brightness-50">
    <button @click="$emit('toggleEnlarged')" class="absolute top-0 right-0 p-4">
      <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    
    <div class="mx-auto flex flex-row justify-center">
      <a :href="story.track.album.spotify_url" target="_blank" rel="noopener noreferrer" class="">
        <img :src="story.track.album.images[0]" :alt="`${story.track.album.name} cover art`" class="rounded-lg transition ease-in-out hover:translate-x-1 hover:-translate-y-1 hover:opacity-80">
      </a>
      <div class="md:text-lg bg-white">
        {{ story.track.album.name }}
      </div>
    </div>
  </div>
</template>
<!-- <div>
  <a :href="story.track.album.spotify_url" target="_blank" rel="noopener noreferrer" class="w-11/12 mx-auto">
    <img :src="story.track.album.images[1]" :alt="`${story.track.album.name} cover art`" class="mx-auto rounded-lg transition ease-in-out hover:translate-x-1 hover:-translate-y-1 hover:opacity-80">
  </a>
</div>
<div class="md:text-lg text-black">
  {{ story.track.album.name }}
</div> -->
<script setup>
const { story } = defineProps(['story'])
</script>

<style scoped>

</style>
