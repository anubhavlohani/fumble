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

  // function togglePreview () {
  //   if (story.track.preview_url) {
  //     if (audio.value) {
  //       if (audio.value.paused) {
  //         audio.value.play()
  //       } else {
  //         audio.value.pause()
  //       }
  //     } else {
  //       audio.value = new Audio(story.track.preview_url)
  //       audio.value.volume = 0.4
  //       audio.value.play()
  //     }
  //   }
  // }
})