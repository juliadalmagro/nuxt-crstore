// https://nuxt.com/docs/api/configuration/nuxt-config

const temaCustomizado = {
  dark: true,
  colors: {
    background: '#FFFFFF',
    toolbar: '#F7F7F7',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["vuetify-nuxt-module", '@nuxt/eslint'],
  plugins: ['~/plugins/axios.js', '~/plugins/mask.js'],
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          temaCustomizado,
        },
      },
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,

      /* vite-plugin-vuetify options */
      autoImport: true ,
    },
  },
})
