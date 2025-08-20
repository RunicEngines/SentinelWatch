// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
      "@tailwindcss/postcss": {},
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "SentinelWatch",
      meta: [{ name: "description", content: "AI Code reviewer" }],
    },
  },
});
