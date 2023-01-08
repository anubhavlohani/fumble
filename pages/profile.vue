<template>
  <div class="mx-auto w-full max-w-xs rounded-lg bg-rose-400 text-white mt-16 py-4">
    <form class="px-4" @submit.prevent="uploadFiles()">
      <div>
        <h1 class="text-center text-2xl mb-1">Upload Meme </h1>
        <input class="py-2 mb-1" @change="addImage( $event )" type="file" accept="image/png, image/jpeg">
      </div>
      <button type="submit" class="block mx-auto text-center text-lg py-1 px-2 rounded bg-rose-600 hover:bg-rose-700 active:bg-rose-800">
        Upload
      </button>
    </form>
  </div>
</template>

<script setup>
const { apiURL } = useRuntimeConfig()

// check if token is valid
onMounted(() => {
  let processServerResponse = (res) => {
    if (!res.ok) {
      alert(res.statusText)
      navigateTo('/login')
    }
  }

  if (localStorage.getItem('access_token') === null) {
    alert('Session expired, please login again.')
    navigateTo('/login')
  }
  fetch(`${apiURL}/verify-token`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
})


const image = ref('')


function addImage (event) {
  image.value = event.target.files[0]
}

function uploadFiles () {
  let processServerResponse = (res) => {
    if (res.ok) {
      alert('File uploaded successfully.')
    } else {
      alert(res.statusText)
      navigateTo('/login')
    }
  } 
  
  const formData = new FormData()
  formData.append('image', image.value)
  const access_token = localStorage.getItem('access_token')
  fetch('http://localhost:8000/file-upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  }).then(res => processServerResponse(res)).catch(error => alert(error))
}
</script>

<style scoped>
</style>
