<template>
  <div class="fixed top-0 left-0 w-full h-full z-50 backdrop-brightness-50">
    <div class="mt-4 md:mt-16">
      <button @click="$emit('toggleEnlarged')" class="absolute top-0 right-0 p-4">
        <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="mx-auto flex flex-col md:flex-row justify-center">
        
        <!-- Song Details -->
        <div class="py-4 px-8 mx-auto w-5/6 md:py-8 md:mx-0 md:w-1/3 flex flex-col gap-y-2 md:gap-y-4 bg-black text-white text-center">
          <a :href="story.track.album.spotify_url" target="_blank" rel="noopener noreferrer" class="w-2/3 mx-auto">
            <img :src="story.track.album.images[0]" :alt="`${story.track.album.name} cover art`" class="rounded-lg transition ease-in-out hover:translate-x-1 hover:-translate-y-1 hover:opacity-80">
          </a>
          <div class="md:text-lg">
            <a :href="story.track.spotify_url" target="_blank" rel="noopener noreferrer" class="hover:p-1 hover:bg-white hover:text-black">
              {{ story.track.name }}
            </a>
          </div>

          <!-- Main Artist -->
          <Artist :artist="story.track.artists[0]" :enlarged="true" />

          <!-- Featured Artists -->
          <div v-if="story.track.artists.length > 1">
            <p class="md:text-lg">Feat:</p>
            <div class="flex overflow-x-auto dark-scrollbar">
              <div v-for="feature in story.track.artists.slice(1,)" :key="feature" class="flex-none py-2 md:py-6 px-3 first:pl-6 last:pr-6">
                <Artist :artist="feature" :enlarged="true" />
              </div>
            </div>
          </div>
        </div>

        <!-- Story Details -->
        <div class="py-2 px-4 mx-auto w-5/6 md:py-4 md:mx-0 md:w-1/4 flex flex-col gap-y-2 md:gap-y-4 bg-white">
          <div class="flex items-center justify-between">
            <div class="flex flex-row gap-x-2">
              <div class="font-medium">{{ story.username }}</div>
              {{ story.caption }}
            </div>
            <MoreOptions />
          </div>
          
          <hr>

          <!-- Comments -->
          <div class="flex flex-col gap-y-1 flex-grow h-32 flex-nowrap overflow-y-auto light-scrollbar">
            <Spinner v-if="storyComments.fetchingComments" />
            <div>
              <div v-for="comment in storyComments.comments" :key="comment">
                <div class="flex flex-row gap-x-2">
                  <div class="font-medium">{{ comment.username }}</div>
                  {{ comment.content }}
                </div>
              </div>
            </div>
          </div>

          <hr>

          <StoryActions :story="story" />
          <!-- Add comment -->
          <form action="post" @submit.prevent="handleCommentPost">
            <div class="flex flex-row justify-between">
              <input v-model="comment" type="text" class="w-5/6 outline-none" placeholder="Add a comment...">
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
import { useCommentsStore } from '~~/store/comments';

const { story } = defineProps(['story'])
const currentUser = useUserStore()
const storyComments = useCommentsStore()
const comment = ref('')

watch(comment, (newValue) => {
  if (newValue.trim() === '') {
    comment.value = ''
  } else {
    comment.value = newValue.trimStart()
  }
})

function handleCommentPost () {
  console.log(story.id)
  storyComments.createComment(comment.value, currentUser.user.id, story.id, localStorage.getItem('access_token'))
  comment.value = ''
}
</script>
