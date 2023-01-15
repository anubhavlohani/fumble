<template>
  <div class="my-12 mx-auto w-10/12 md:w-full max-w-md flex flex-col text-center rounded-lg bg-zinc-100 text-white">
    <!-- Album details -->
    <div class="py-4 px-4 mx-auto w-10/12">
      <div class="gap-y-4 flex flex-col">
        <img :src="story.track.album.images[1]" :alt="`${story.track.album.name} cover art`" class="rounded-lg">
        <div class="md:text-lg text-black">
          {{ story.track.album.name }}
        </div>
      </div>
    </div>
    
    <!-- Song details -->
    <div class="py-4 px-2 rounded-t-lg bg-black">
      <div class="text-lg">
        {{ story.track.name }}
      </div>
      <div class="py-2 gap-x-2 flex flex-row justify-center items-center">
        <div class="gap-x-1 flex flex-row justify-center items-center">
          <div>
            <img :src="story.track.artists[0].images[2]" :alt="`${story.track.artists[0].name} picture`" class="w-6 md:w-8 block rounded-full">
          </div>
          <div>
            {{ story.track.artists[0].name }}
          </div>
        </div>
      </div>
      <div v-if="story.track.artists.length > 1" class="gap-x-2 flex flex-row flex-wrap justify-center items-center">
        Feat:
        <div v-for="feature in story.track.artists.slice(1,)" :key="feature" class="gap-x-1 flex flex-row justify-center items-center">
          <div>
            <img :src="feature.images[2]" :alt="`${feature.name} picture`" class="w-6 md:w-8 block rounded-full">
          </div>
          <div>
            {{ feature.name }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Story deatils -->
    <div class="py-2 px-4 text-left rounded-b-lg bg-black">
      <div class="font-semibold">
        {{ story.username }}
      </div>
      <div>
        {{ story.caption }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { story } = defineProps(['story'])
</script>
