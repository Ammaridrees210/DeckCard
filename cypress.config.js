const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://deckofcardsapi.com/',
    specPattern: 'cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
  },
});
