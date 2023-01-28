import { defineStore } from "pinia"

export const useCommentsStore = defineStore('comments', () => {
const { apiURL } = useRuntimeConfig()

const comments = ref(null)
const fetchingComments = computed(() => comments.value === null ? true : false)

  function getComments (storyId, accessToken) {
    let processServerResponse = async (res) => {
      if (res.ok) {
        const resData = await res.json()
        comments.value = resData.comments
      } else {
        return navigateTo('/login')
      }
    }
    
    comments.value = null
    fetch(`${apiURL}/story-comments?story_id=${storyId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true
      }
    }).then(res => processServerResponse(res)).catch(error => alert(error))
  }

  function createComment (newComment, userId, storyId, accessToken) {
    let processServerResponse = async (res) => {
      if (res.ok) {
        getComments(storyId, accessToken)
      } else {
        return navigateTo('/login')
      }
    }
  
    if (newComment !== '') {
      const commentData = {
        content: newComment.trim(),
        user_id: userId,
        story_id: storyId
      }
      fetch(`${apiURL}/post-comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": true
        },
        body: JSON.stringify(commentData)
      }).then(res => processServerResponse(res)).catch(error => alert(error))
    }
  }

  function deleteComment (commentId, storyId, accessToken) {
    let processServerResponse = async (res) => {
      if (res.ok) {
        getComments(storyId, accessToken)
      } else {
        return navigateTo('/login')
      }
    }
    
    fetch(`${apiURL}/delete-comment?comment_id=${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true
      }
    }).then(res => processServerResponse(res)).catch(error => alert(error))
  }

  return { comments, fetchingComments, getComments, createComment, deleteComment }
})