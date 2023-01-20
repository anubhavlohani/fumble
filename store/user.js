import { defineStore } from "pinia"

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const access_token = ref(null)

  return { user, access_token }
})