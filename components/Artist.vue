<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <a :href="artist.spotify_url" target="_blank" rel="noopener noreferrer" class="hover:opacity-80">
      <img :src="artist.images[2]" :alt="`${artist.name} picture`" class="w-6 md:w-20 block rounded-full">
    </a>
    <a :href="artist.spotify_url" target="_blank" rel="noopener noreferrer" class="hover:bg-white hover:text-black">
      {{ artist.name }}
    </a>
  </div>
</template>

<script setup>
const { artist } = defineProps(['artist'])
</script>
