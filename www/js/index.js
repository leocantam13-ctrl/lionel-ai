// index.js - Core do chat
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const input = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  LionelMemory.init();
  LionelSettings.init();

  async function sendMessage() {
    const text = input.value.trim();
    if(!text) return;

    addBubble(text, "user");
    LionelMemory.saveInteraction("user", text);
    input.value = "";

    const apiKey = LionelSettings.getApiKey();
    const context = LionelMemory.getContext();
    const response = await callGeminiAPI(text, context, apiKey);

    addBubble(response, "lionel");
    LionelMemory.saveInteraction("lionel", response);
  }

  function addBubble(text, role) {
    const div = document.createElement("div");
    div.className = `bubble ${role}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function callGeminiAPI(text, context, key) {
    if(!key) return "API Key não configurada!";
    try {
      const res = await fetch("https://api.gemini.fake/v1/chat", { // coloque sua API real
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
        body: JSON.stringify({ text, context })
      });
      const data = await res.json();
      return data.reply || "Sem resposta da API.";
    } catch(e) {
      return "Erro ao conectar com a API.";
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", e => { if(e.key === "Enter") sendMessage(); });
});
