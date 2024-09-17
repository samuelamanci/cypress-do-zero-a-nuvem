const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    //aqui posso colocar a baseURL
    //EX: baseUrl: 'https://example.cypress.io'
  },
  video: false
})
