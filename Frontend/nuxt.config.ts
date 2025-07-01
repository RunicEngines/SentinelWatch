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
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    'nuxt-toast',
    '@nuxtjs/google-fonts'

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