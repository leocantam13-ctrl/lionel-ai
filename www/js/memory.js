// memory.js - Guarda histórico simples
const LionelMemory = (() => {
  let history = [];

  function init() {
    history = JSON.parse(localStorage.getItem("lionelHistory") || "[]");
  }

  function saveInteraction(role, text) {
    history.push({ role, text, time: Date.now() });
    localStorage.setItem("lionelHistory", JSON.stringify(history));
  }

  function getContext() {
    return history.map(msg => `${msg.role}: ${msg.text}`).join("\n");
  }

  return { init, saveInteraction, getContext };
})();
