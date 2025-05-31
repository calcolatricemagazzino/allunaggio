document.addEventListener("DOMContentLoaded", function () {
  var loginSection = document.getElementById("login-section");
  var registerSection = document.getElementById("register-section");

  var showRegisterLink = document.getElementById("show-register");
  var showLoginLink = document.getElementById("show-login");

  var erroreLogin = document.getElementById("errore-login");
  var erroreRegister = document.getElementById("errore-register");

  showRegisterLink.addEventListener("click", function (e) {
    e.preventDefault();
    clearError(erroreLogin);
    loginSection.style.display = "none";
    registerSection.style.display = "flex";
  });

  showLoginLink.addEventListener("click", function (e) {
    e.preventDefault();
    clearError(erroreRegister);
    registerSection.style.display = "none";
    loginSection.style.display = "flex";
  });

  function showError(elem, msg) {
    elem.textContent = msg;
    elem.classList.add("show");
  }

  function clearError(elem) {
    elem.textContent = "";
    elem.classList.remove("show");
  }

  document.getElementById("login-btn").addEventListener("click", function () {
    var user = document.getElementById("username").value.trim();
    var pass = document.getElementById("password").value.trim();

    clearError(erroreLogin);

    var utenti = JSON.parse(localStorage.getItem("utenti") || "{}");

    if (!user || !pass) {
      showError(erroreLogin, "Compila tutti i campi!");
      return;
    }

    if (utenti[user] && utenti[user] === pass) {
      localStorage.setItem("utenteLoggato", user);
      window.location.href = "simulazione/index.html";
    } else {
      showError(erroreLogin, "Credenziali non valide.");
    }
  });

  document
    .getElementById("register-btn")
    .addEventListener("click", function () {
      var user = document.getElementById("newUser").value.trim();
      var pass = document.getElementById("newPass").value.trim();

      clearError(erroreRegister);

      var utenti = JSON.parse(localStorage.getItem("utenti") || "{}");
      var regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;

      if (!user || !pass) {
        showError(erroreRegister, "Compila tutti i campi!");
        return;
      }
      if (!regex.test(pass)) {
        showError(
          erroreRegister,
          "Password non valida. Min 6 caratteri, almeno una lettera e un numero."
        );
        return;
      }
      if (utenti[user]) {
        showError(erroreRegister, "Utente già esistente.");
        return;
      }

      utenti[user] = pass;
      localStorage.setItem("utenti", JSON.stringify(utenti));
      alert("Registrazione riuscita! Ora effettua il login.");

      document.getElementById("newUser").value = "";
      document.getElementById("newPass").value = "";
      clearError(erroreRegister);

      registerSection.style.display = "none";
      loginSection.style.display = "flex";
    });
});
