const config = require("./config");

/**
 * Downloads the statement history for City of Joburg
 * @param {import('puppeteer').Page} page - Authenticated Puppeteer page
 * @param {Object} cfg - Configuration object (optional, defaults to city-of-joburg config)
 */
module.exports = async function statementHistory(page, cfg = config) {
  const { urls, selectors, options } = cfg;
  const { dropdownTrigger, dropdownItems } = selectors.statementHistory;
  const targetText = options.dropdownTarget;

  // Navigate to statement history page
  await page.goto(urls.statementHistory, { waitUntil: "domcontentloaded" });

  // Wait and click the dropdown trigger
  try {
    await page.waitForSelector(dropdownTrigger, {
      visible: true,
      timeout: 5000,
    });
    await page.click(dropdownTrigger, { delay: 25 });
  } catch (err) {
    console.error("Dropdown trigger not found:", err);
  }

  // Wait for dropdown options to render
  try {
    await page.waitForFunction(
      (sel) => document.querySelectorAll(sel).length > 0,
      { timeout: 10000 },
      dropdownItems
    );
  } catch (err) {
    console.error("Dropdown options not loaded:", err);
  }

  // Select the desired dropdown option
  try {
    await page.evaluate(
      (sel, text) => {
        const items = Array.from(document.querySelectorAll(sel));
        const match = items.find((el) => el.textContent.includes(text));
        if (match) {
          match.click();
        } else {
          console.warn("Target option not found in dropdown.");
        }
      },
      dropdownItems,
      targetText
    );
  } catch (err) {
    console.error("Failed to select dropdown option:", err);
  }
};
