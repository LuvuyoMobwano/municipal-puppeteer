module.exports = {
  name: "city-of-joburg",

  urls: {
    home: "https://www.e-joburg.org.za",
    statementHistory: "https://www.e-joburg.org.za/statement-history",
  },

  credentials: {
    username: "Lisam",
    password: "25272Lisam*",
  },

  selectors: {
    login: {
      dropdownToggle: ".dropdown-toggle",
      usernameInput: 'input[placeholder="Username"]',
      passwordInput: 'input[placeholder="Password"]',
      submitButton: "button[type='submit'], input[type='submit'], .ui-button",
      popupClose: ".ui-dialog-titlebar-close",
    },

    statementHistory: {
      dropdownLabel: "label.ui-selectonemenu-label",
      dropdownTrigger: "div.ui-selectonemenu-trigger",
      dropdownItems: "li.ui-selectonemenu-item",
    },
  },

  options: {
    dropdownTarget: "550406501 - Convertible Dementia (Pty) Ltd",
  },
};
