const config = require("./config");

/**
 * Scrapes the online bills for City of Ekurhuleni by setting page size.
 * @param {import('puppeteer').Page} page - Authenticated Puppeteer page
 * @param {Object} cfg - Configuration object (optional, defaults to city-of-ekurhuleni config)
 */
module.exports = async function statementHistory(page, cfg = config) {
  const { urls, selectors, options } = cfg;
  const { pageSizeDropdown, pageSizeOptions } = selectors.statementHistory;
  const targetSize = options.pageSize;

  // Navigate to the online bills page
  await page.goto(urls.statementHistory, { waitUntil: "networkidle2" });

  // Wait for and click the page size dropdown
  try {
    await page.waitForSelector(pageSizeDropdown, {
      visible: true,
      timeout: 5000,
    });
    await page.click(pageSizeDropdown);
  } catch (err) {
    console.error("Page size dropdown not found:", err);
    return;
  }

  // Wait for dropdown options to render
  try {
    await page.waitForSelector(pageSizeOptions, {
      visible: true,
      timeout: 5000,
    });
  } catch (err) {
    console.error("Page size options did not appear:", err);
    return;
  }

  // Select the configured page size option
  try {
    await page.evaluate(
      (optSel, size) => {
        const items = Array.from(document.querySelectorAll(optSel));
        const match = items.find((el) => el.textContent.trim() === size);
        if (match) {
          match.click();
        } else {
          console.warn(`Page size option "${size}" not found.`);
        }
      },
      pageSizeOptions,
      targetSize
    );
    // Wait for table reload after changing page size
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 });
  } catch (err) {
    console.error("Failed to select page size option:", err);
  }
};
