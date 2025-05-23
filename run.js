#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

async function main() {
  // Expect the municipality folder name as the first CLI argument
  const municipality = process.argv[2];
  if (!municipality) {
    console.error("Usage: node run.js <municipality-folder-name>");
    process.exit(1);
  }

  const baseDir = path.join(__dirname, "municipalities", municipality);
  if (!fs.existsSync(baseDir)) {
    console.error(`Municipality "${municipality}" not found at ${baseDir}`);
    process.exit(1);
  }

  // Load config and modules
  const config = require(path.join(baseDir, "config.js"));
  const login = require(path.join(baseDir, "login.js"));
  const statementHistory = require(path.join(baseDir, "download-process.js"));

  // Perform login
  const { browser, page } = await login();

  // Run the municipality-specific statement history process
  try {
    await statementHistory(page, config);
  } catch (error) {
    console.error("Error running statementHistory:", error);
  } finally {
    // Close the browser when done
    // await browser.close();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
