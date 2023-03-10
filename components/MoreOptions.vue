<template>
  <button @click="showOptions=true">
    <svg class="h-4 w-4 fill-black" viewBox="0 0 24 24">
      <circle cx="3" cy="12" r="2.5"></circle>
      <circle cx="12" cy="12" r="2.5"></circle>
      <circle cx="21" cy="12" r="2.5"></circle>
    </svg>
  </button>

  <div v-if="showOptions" class="fixed top-0 left-0 w-full h-full z-50 backdrop-brightness-50">
    <button @click="showOptions=false" class="absolute top-0 right-0 p-4 z-50">
      <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <div class="fixed inset-0 flex items-center">
      <div class="py-4 px-4 mx-auto w-1/2 md:w-1/6 rounded-xl text-lg bg-white text-black">
        <!-- Confirmation Message -->
        <div v-if="confirmation && confirmation.type === 'delete'" class="flex flex-col justify-center gap-y-4">
          <div v-if="story">
            Are you sure you want to delete this story?
            <button @click="deleteStory" class="w-full text-red-600">Delete</button>
          </div>
          <div v-else-if="comment">
            Are you sure you want to delete this comment?
            <button @click="emits('deleteComment')" class="w-full text-red-600">Delete</button>
          </div>
          
          <button @click="showOptions=false" class="w-full text-slate-600">Cancel</button>
        </div>
        
        <!-- Story/Comment Options -->
        <div v-else class="flex flex-col justify-center gap-y-4">
          <button v-if="story && currentUser.user.username === story.username || comment && currentUser.user.username === comment.username" @click="confirmDelete" class="w-full text-red-600">Delete</button>
          
          <button @click="showOptions=false" class="w-full text-slate-600">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~~/store/user';

const emits = defineEmits(['deleteComment'])
const { story, comment } = defineProps(['story', 'comment'])
const { apiURL } = useRuntimeConfig()
const currentUser = useUserStore()
const showOptions = ref(false)
const confirmation = ref(null)

function confirmDelete () {
  confirmation.value = {
    type: 'delete'
  }
}

function deleteStory () {
  let processServerResponse = async (res) => {
    if (res.ok) {
      window.location.reload(true)
    } else {
      return navigateTo('/login')
    }
  }
  
  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    return navigateTo('/login')
  }
  
  fetch(`${apiURL}/delete-story?story_id=${story.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      "ngrok-skip-browser-warning": true
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}
</script>
