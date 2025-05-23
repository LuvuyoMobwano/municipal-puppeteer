const loginBase = require("../../common/loginBase");
const config = require("./config");

/**
 * Login function for City of Tshwane
 * @returns {Promise<{browser: import('puppeteer').Browser, page: import('puppeteer').Page}>}
 */
module.exports = async function login() {
  return await loginBase(config);
};
