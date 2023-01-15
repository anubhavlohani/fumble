import { defineStore } from "pinia"

export const useCurrentStoryStore = defineStore('currentStory', () => {
  const story = ref(null)
  const playingPreview = ref(false)

  function getPreviewAudio () {
    if (story.value && story.value.track.preview_url) {
      const audio = new Audio(story.value.track.preview_url)
      audio.volume = 0.4
      return audio
    } else {
      return null
    }
  }

  return { story, playingPreview, getPreviewAudio }
})