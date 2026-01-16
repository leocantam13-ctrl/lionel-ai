/* =========================================================
   LIONEL – CORE BRAIN + GEMINI
   Inteligência real com memória, voz e contexto
   ========================================================= */

const LionelCore = (() => {
  let context = {
    lastInteraction: null,
    proactiveEnabled: true,
    listening: false
  };

  /* ---------- INIT ---------- */

  function init() {
    console.log("Lionel iniciado");

    window.LionelMemory?.init();
    window.LionelSettings?.init();
    window.LionelVoice?.init();

    startIdleWatcher();
  }

  /* ---------- INTERAÇÃO PRINCIPAL ---------- */

  async function handleUserText(text) {
    if (!text) return;

    context.lastInteraction = Date.now();

    LionelMemory?.saveInteraction("user", text);

    addUserBubble(text);

    const memoryContext = LionelMemory?.getContext?.() || "";

    const response = await LionelGemini.sendText(
      text,
      memoryContext
    );

    respond(response);
  }

  function respond(text) {
    if (!text) return;

    LionelMemory?.saveInteraction("lionel", text);

    addLionelBubble(text);

    LionelVoice?.speak(text);
  }

  /* ---------- PROATIVIDADE ---------- */

  function startIdleWatcher() {
    setInterval(() => {
      if (!context.proactiveEnabled) return;
      if (!context.lastInteraction) return;

      const idle = Date.now() - context.lastInteraction;

      if (idle > 180000) { // 3 min
        proactiveComment();
        context.lastInteraction = Date.now();
      }
    }, 30000);
  }

  async function proactiveComment() {
    const memoryContext = LionelMemory?.getContext?.() || "";

    const response = await LionelGemini.sendText(
      "Faça um comentário curto e amigável para o usuário, como um companheiro.",
      memoryContext
    );

    respond(response);
  }

  /* ---------- VOZ ---------- */

  function startVoiceMode() {
    if (context.listening) return;

    LionelVoice?.startListening(text => {
      handleUserText(text);
    });

    context.listening = true;
  }

  function stopVoiceMode() {
    LionelVoice?.stopListening();
    context.listening = false;
  }

  /* ---------- UI HELPERS ---------- */

  function addUserBubble(text) {
    window.addLionelBubble?.(text, "user");
  }

  function addLionelBubble(text) {
    window.addLionelBubble?.(text, "lionel");
  }

  /* ---------- API ---------- */

  return {
    init,
    handleUserText,
    startVoiceMode,
    stopVoiceMode
  };
})();

/* ---------- START ---------- */

document.addEventListener("DOMContentLoaded", () => {
  LionelCore.init();
});
