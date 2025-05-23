const config = require("./config");

/**
 * Scrapes the statement history for City of Tshwane.
 * @param {import('puppeteer').Page} page - Authenticated Puppeteer page
 * @param {Object} cfg - Configuration object (optional, defaults to city-of-tshwane config)
 */
module.exports = async function statementHistory(page, cfg = config) {
  const { urls, selectors, options } = cfg;
  const { dropdownTrigger, dropdownItems } = selectors.statementHistory;
  const target = options.accountNameOrNumber;

  // Navigate to the statement history page
  await page.goto(urls.statementHistory, { waitUntil: "domcontentloaded" });

  // Wait for and click the dropdown trigger
  try {
    await page.waitForSelector(dropdownTrigger, {
      visible: true,
      timeout: 5000,
    });
    await page.click(dropdownTrigger);
  } catch (err) {
    console.error("Dropdown trigger not found:", err);
  }

  // Wait for dropdown items to be present
  try {
    await page.waitForFunction(
      (sel) => document.querySelectorAll(sel).length > 0,
      { timeout: 10000 },
      dropdownItems
    );
  } catch (err) {
    console.error("Dropdown items did not render:", err);
  }

  // Select the configured account from the dropdown
  try {
    await page.evaluate(
      (sel, value) => {
        const items = Array.from(document.querySelectorAll(sel));
        const match = items.find((el) => el.textContent.includes(value));
        if (match) {
          match.click();
        } else {
          console.warn(`Option containing "${value}" not found.`);
        }
      },
      dropdownItems,
      target
    );
  } catch (err) {
    console.error("Failed to select dropdown option:", err);
  }
};
