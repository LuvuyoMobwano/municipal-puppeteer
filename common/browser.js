// file for launching puppeteer browser
const puppeteer = require("puppeteer");

/**
 * Launches a Puppeteer browser instance with default settings.
 * @param {Object} [options] - Optional Puppeteer launch options to override defaults.
 * @returns {Promise<import('puppeteer').Browser>}
 */
async function launchBrowser(options = {}) {
  const launchOptions = Object.assign(
    {
      headless: false,
      defaultViewport: false,
    },
    options
  );

  return await puppeteer.launch(launchOptions);
}

module.exports = launchBrowser;
