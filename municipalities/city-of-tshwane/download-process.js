const config = require("./config");

/**
 * Navigates directly to the statement history page for City of Tshwane
 * (ignoring any ERR_ABORTED), then selects the configured account.
 */
module.exports = async function downloadProcess(page, cfg = config) {
  const { urls, selectors, options } = cfg;
  const { dropdownTrigger, dropdownItems } = selectors.statementHistory;
  const target = options.accountNameOrNumber;

  // 1) Direct GET of the page (no timeout)
  await page
    .goto(urls.statementHistory, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    })
    .catch((err) => {
      console.warn("Direct goto aborted (ignored):", err);
    });

  // 2) Open the account dropdown
  try {
    await page.waitForSelector(dropdownTrigger, {
      visible: true,
      timeout: 10_000,
    });
    await page.click(dropdownTrigger, { delay: 25 });
  } catch (err) {
    console.error("Dropdown trigger not found:", err);
    return;
  }

  // 3) Wait for and select the account
  try {
    await page.waitForFunction(
      (sel) => document.querySelectorAll(sel).length > 0,
      { timeout: 10_000 },
      dropdownItems
    );
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
