<template>
  <div class="my-12 mx-auto flex flex-col text-center w-full max-w-md rounded-lg bg-zinc-100 text-white">
    <!-- Album cover -->
    <div class="py-4 px-4 mx-auto">
      <img :src="story.track.album.images[1]" :alt="`${story.track.album.name} cover art`" class="rounded-lg">
    </div>
    <!-- Song details -->
    <div class="py-4 px-4 rounded-t-lg bg-black text-lg">
      <div>
        {{ story.track.name }}
      </div>
      <div class="gap-x-4 flex flex-row justify-center items-center">
        <div>
          <img :src="story.track.artists[0].images[2]" :alt="`${story.track.artists[0].name} picture`" class="w-8 block rounded-full">
        </div>
        <div>
          {{ story.track.artists[0].name }}
        </div>
      </div>
    </div>
    <!-- Story deatils -->
    <div class="py-4 px-4 text-left rounded-b-lg bg-black">
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
