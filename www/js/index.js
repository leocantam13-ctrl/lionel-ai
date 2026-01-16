document.addEventListener("deviceready", () => {
  const chat = document.getElementById("chat");
  const input = document.getElementById("userInput");

  function addMsg(text, cls) {
    const div = document.createElement("div");
    div.className = `msg ${cls}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  document.getElementById("sendBtn").onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    addMsg("Você: " + text, "user");
    Memory.save("user", text);

    const reply = await askGemini(text);
    addMsg("Lionel: " + reply, "ai");
    Memory.save("ai", reply);
    speak(reply);
  };

  document.getElementById("micBtn").onclick = () => {
    startListening(text => {
      input.value = text;
    });
  };

  document.getElementById("saveApi").onclick = () => {
    const key = document.getElementById("apiKey").value;
    localStorage.setItem("gemini_api", key);
    alert("API salva!");
  };
});
