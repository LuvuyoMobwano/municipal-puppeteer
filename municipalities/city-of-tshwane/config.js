module.exports = {
  name: "city-of-tshwane",

  urls: {
    home: "https://www.e-tshwane.co.za/eTshwane/",
    statementHistory: "https://www.e-tshwane.co.za/eTshwane/statement-history",
  },

  credentials: {
    username: "Cityprop",
    password: "Premium@12",
  },

  selectors: {
    login: {
      dropdownToggle: ".dropdown-toggle",
      usernameInput: 'input[placeholder="Username"]',
      passwordInput: 'input[placeholder="Password"]',
      submitButton: "button[type='submit'], input[type='submit'], .ui-button",
    },

    statementHistory: {
      dropdownTrigger: ".ui-selectonemenu-trigger",
      dropdownItems: "li.ui-selectonemenu-item",
    },
  },

  options: {
    accountNameOrNumber: "1033021625",
  },
};
