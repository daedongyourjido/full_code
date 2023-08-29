const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    requestTimeout: 10000,
    defaultCommandTimeout: 10000,
    viewportHeight: 800,
    viewportWidth: 1400,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});