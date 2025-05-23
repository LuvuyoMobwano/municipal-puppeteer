const loginBase = require("../../common/loginBase");
const config = require("./config");

// Map the 'login' URL in config to 'home' for loginBase compatibility
config.urls.home = config.urls.login;

/**
 * Login function for City of Ekurhuleni
 * @returns {Promise<{browser: import('puppeteer').Browser, page: import('puppeteer').Page}>}
 */
module.exports = async function login() {
  return await loginBase(config);
};
