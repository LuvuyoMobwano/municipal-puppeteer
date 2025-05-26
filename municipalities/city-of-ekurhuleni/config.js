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
  },
};
