<template>
  <div class="max-h-36 overflow-auto text-base bg-rose-200 rounded-b shadow-xl">
    <a v-for="track in searchResults" :key="track" @click="$emit('handleSelection', track)" class="py-1 px-2 block text-gray-600 hover:bg-rose-700 hover:text-white">
      {{ track.name }}
    </a>
  </div>
</template>

<script setup>
const { searchResults } = defineProps(['searchResults'])
const emit = defineEmits(['handleSelection'])
</script>
