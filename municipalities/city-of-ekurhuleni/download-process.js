const config = require("./config");

/**
 * Navigates to the online bills page for City of Ekurhuleni.
 * Falls back to clicking any “Online Bills” link text if direct goto is aborted.
 * @param {import('puppeteer').Page} page
 * @param {Object} cfg
 */
module.exports = async function downloadProcess(page, cfg = config) {
  const { urls } = cfg;

  // 1) Try direct navigation
  try {
    await page.goto(urls.statementHistory, { waitUntil: "networkidle2" });
    return;
  } catch (err) {
    console.warn(
      "Direct navigation aborted; attempting link‐click fallback:",
      err
    );
  }

  // 2) Fallback: click any link with text “Online Bills”
  try {
    const [link] = await page.$x(
      "//a[contains(normalize-space(.), 'Online Bills')]"
    );
    if (!link) {
      throw new Error("No anchor with text “Online Bills” found");
    }
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 }),
      link.click({ delay: 25 }),
    ]);
  } catch (fallbackErr) {
    console.error(
      "Fallback navigation to online bills page failed:",
      fallbackErr
    );
  }
};
