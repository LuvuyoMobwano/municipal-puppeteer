module.exports = {
  name: "city-of-ekurhuleni",

  credentials: {
    username: "Cityprop",
    password: "Elsie#123",
  },

  urls: {
    login: "https://siyakhokha.ekurhuleni.gov.za/Account/Login",
    statementHistory: "https://siyakhokha.ekurhuleni.gov.za/Report/OnlineBills",
  },

  selectors: {
    login: {
      usernameInput: "#UserName",
      passwordInput: "#Password",
      submitButton: 'input[type="submit"].btn.btn-primary',
    },

    statementHistory: {
      pageSizeDropdown: 'button[data-toggle="dropdown"].dropdown-toggle',
      pageSizeOptions: "ul.dropdown-menu li a",
    },
  },

  options: {
    pageSize: "100", // This is the target innerText to match inside <a> elements
  },
};
