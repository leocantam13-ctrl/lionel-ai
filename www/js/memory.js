const LionelMemory = (() => {
  const interactions = [];

  function init() {
    const stored = localStorage.getItem("lionelMemory");
    if(stored) {
      const data = JSON.parse(stored);
      interactions.push(...data);
      renderHistory();
    }
  }

  function saveInteraction(actor, text) {
    interactions.push({actor, text, timestamp: Date.now()});
    localStorage.setItem("lionelMemory", JSON.stringify(interactions));
    renderHistory();
  }

  function getContext() {
    return interactions.map(i => `${i.actor}: ${i.text}`).join("\n");
  }

  function renderHistory() {
    const chat = document.getElementById("chat-history");
    if(!chat) return;
    chat.innerHTML = "";
    interactions.forEach(i => {
      const div = document.createElement("div");
      div.className = i.actor === "lionel" ? "lionel-bubble" : "user-bubble";
      div.innerText = i.text;
      chat.appendChild(div);
    });
  }

  return { init, saveInteraction, getContext };
})();
