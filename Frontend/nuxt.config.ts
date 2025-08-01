import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/ui'

  ],
  app: {
    head: {

      title: "SeninelWatch",
      meta: [
        { name: "description", content: "AI Code reviewer " }
      ]
    }
  }

})