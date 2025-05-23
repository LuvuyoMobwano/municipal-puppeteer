const login = require("./run.js"); // Import the login function

(async () => {
  const { browser, page } = await login(); // Log in and get the authenticated page

  // Navigate to the statement history page
  await page.goto("https://www.e-joburg.org.za/statement-history", {
    waitUntil: "domcontentloaded",
  });

  // Wait and click the dropdown trigger
  try {
    await page.waitForSelector("label.ui-selectonemenu-label", {
      visible: true,
      timeout: 5000,
    });
    await page.click("div.ui-selectonemenu-trigger");
  } catch (err) {
    console.error("Dropdown trigger not found:", err);
  }

  // Wait for dropdown options to render
  try {
    await page.waitForFunction(
      () => document.querySelectorAll("li.ui-selectonemenu-item").length > 0,
      { timeout: 10000 }
    );
  } catch (err) {
    console.error("Dropdown options not loaded:", err);
  }

  // Select the desired dropdown option
  try {
    await page.evaluate(() => {
      const targetText = "550406501 - Convertible Dementia (Pty) Ltd";
      const options = [
        ...document.querySelectorAll("li.ui-selectonemenu-item"),
      ];
      const match = options.find((el) => el.textContent.includes(targetText));
      if (match) {
        match.click();
      } else {
        console.warn("Target option not found in dropdown.");
      }
    });
  } catch (err) {
    console.error("Failed to select dropdown option:", err);
  }

  // Keep browser open or uncomment below to close after completion
  // await browser.close();
})();
