const puppeteer = require("puppeteer");

/**
 * Generic login routine using configuration for any municipality.
 * @param {Object} config - Configuration object with URLs, selectors, and credentials.
 * @returns {Promise<{browser: import('puppeteer').Browser, page: import('puppeteer').Page}>}
 */
async function loginBase(config) {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  // Open new page
  const page = await browser.newPage();
  await page.goto(config.urls.home, {
    waitUntil: "domcontentloaded",
  });

  // Open login dropdown if configured
  if (config.selectors.login.dropdownToggle) {
    try {
      await page.waitForSelector(config.selectors.login.dropdownToggle, {
        visible: true,
        timeout: 5000,
      });
      await page.click(config.selectors.login.dropdownToggle);
    } catch (error) {
      console.error("Login dropdown toggle not found (skipping):", error);
    }
  }

  // Enter username
  try {
    await page.waitForSelector(config.selectors.login.usernameInput, {
      visible: true,
      timeout: 5000,
    });
    await page.type(
      config.selectors.login.usernameInput,
      config.credentials.username,
      { delay: 100 }
    );
  } catch (error) {
    console.error("Username field not found:", error);
  }

  // Enter password
  try {
    await page.waitForSelector(config.selectors.login.passwordInput, {
      visible: true,
      timeout: 5000,
    });
    await page.type(
      config.selectors.login.passwordInput,
      config.credentials.password,
      { delay: 100 }
    );
  } catch (error) {
    console.error("Password field not found:", error);
  }

  // Click login button
  try {
    await page.waitForSelector(config.selectors.login.submitButton, {
      visible: true,
      timeout: 5000,
    });
    await page.click(config.selectors.login.submitButton);
  } catch (error) {
    console.error("Login button not found:", error);
  }

  // Close notice popup if configured
  if (config.selectors.login.popupClose) {
    try {
      await page.waitForSelector(config.selectors.login.popupClose, {
        visible: true,
        timeout: 5000,
      });
      await page.click(config.selectors.login.popupClose);
    } catch (error) {
      console.warn("Notice popup did not appear or could not be closed.");
    }
  }

  return { browser, page };
}

module.exports = loginBase;
