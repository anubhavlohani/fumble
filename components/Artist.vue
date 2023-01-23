<template>
  <div class="flex flex-col items-center justify-center" :class="enlarged ? 'gap-2' : 'gap-1'">
    <a :href="artist.spotify_url" target="_blank" rel="noopener noreferrer" class="hover:opacity-80">
      <img :src="artist.images[2]" :alt="`${artist.name} picture`" class="w-12 md:w-20 block rounded-full" :class="enlarged ? 'w-12 md:20' : 'w-8 md:w-12'">
    </a>
    <a :href="artist.spotify_url" target="_blank" rel="noopener noreferrer" class="hover:bg-white hover:text-black" :class="enlarged ? '' : 'text-sm'">
      {{ artist.name }}
    </a>
  </div>
</template>

<script setup>
const { artist, enlarged } = defineProps(['artist', 'enlarged'])
</script>
