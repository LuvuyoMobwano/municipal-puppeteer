const config = require("./config");

/**
 * Navigates to the online bills page for City of Ekurhuleni,
 * ignores any ERR_ABORTED, then waits for a known on-page element.
 *
 * @param {import('puppeteer').Page} page
 */
module.exports = async function downloadProcess(page) {
  // 1) Swallow any abort by using timeout:0 and catching
  try {
    await page.goto(config.urls.statementHistory, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });
  } catch (err) {
    console.warn("Navigation to OnlineBills page aborted (ignored):", err);
  }

  // 2) Wait for a selector that only exists on the OnlineBills page.
  //    You must inspect the page and replace this with a real element.
  //    e.g. a table id, a header, or a specific button.
  const READY_SELECTOR = "#onlineBillsContainer";
  try {
    await page.waitForSelector(READY_SELECTOR, {
      visible: true,
      timeout: 10000,
    });
  } catch (err) {
    console.error(
      `Live bills container "${READY_SELECTOR}" did not appear:`,
      err
    );
  }

  // 3) Now you can safely proceed with scraping, downloading, etc.
};
