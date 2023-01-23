// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: [
    '@/assets/style.css'
  ],
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
    }
  }
})
