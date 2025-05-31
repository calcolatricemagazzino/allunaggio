if (!localStorage.getItem("utenteLoggato")) {
  window.location.href = "../index.html";
}

function logout() {
  localStorage.removeItem("utenteLoggato");
  window.location.href = "../index.html";
}

window.addEventListener("DOMContentLoaded", function () {
  var utente = localStorage.getItem("utenteLoggato");
  if (!utente) return;

  var nav = document.getElementById("navicella");
  nav.style.top = "0px";

  var allData = JSON.parse(localStorage.getItem("datiSimulazione") || "{}");
  if (allData[utente]) {
    var dati = allData[utente];
    document.getElementById("massa").value = dati.massa;
    document.getElementById("velocita").value = dati.velocita;
  }

  document.getElementById("btn-avvia").disabled = false;
});

function avviaSimulazione() {
  var btn = document.getElementById("btn-avvia");
  var massa = parseFloat(document.getElementById("massa").value);
  var v0 = parseFloat(document.getElementById("velocita").value);
  var nav = document.getElementById("navicella");
  var luna = document.getElementById("luna");
  var tempoEl = document.getElementById("tempo");

  if (isNaN(massa) || isNaN(v0) || massa <= 0 || v0 < 0) {
    alert("Inserisci massa >0 e velocità ≥0 valide!");
    return;
  }

  btn.disabled = true;

  var utente = localStorage.getItem("utenteLoggato");
  if (utente) {
    var allData = JSON.parse(localStorage.getItem("datiSimulazione") || "{}");
    allData[utente] = { massa: massa, velocita: v0 };
    localStorage.setItem("datiSimulazione", JSON.stringify(allData));
  }

  var g = 1.62;
  var h0 = 100;
  var dt = 30 / 1000;
  var Hpx = luna.clientHeight - nav.clientHeight;

  var discriminante = v0 * v0 + 2 * g * h0;
  var tLanding = (-v0 + Math.sqrt(discriminante)) / g;
  var pxPerM = Hpx / h0;

  var t = 0,
    y = 0,
    v = v0;
  nav.style.top = "0px";

  var timer = setInterval(function () {
    t += dt;
    v += g * dt;
    y += v * dt;

    nav.style.top = Math.min(y * pxPerM, Hpx) + "px";
    tempoEl.innerText =
      "Tempo di atterraggio: " + Math.min(t, tLanding).toFixed(2) + " s";

    if (t >= tLanding) {
      clearInterval(timer);
      btn.disabled = false;
    }
  }, dt * 1000);
}
