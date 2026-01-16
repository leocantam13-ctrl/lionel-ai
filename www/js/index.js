/* =========================================================
   LIONEL CORE – Chat + Voz + Memória + Proatividade
   ========================================================= */

const LionelCore = (() => {
  let context = {
    lastInteraction: null,
    proactiveEnabled: true,
    listening: false
  };

  function init() {
    console.log("LionelCore iniciado");

    LionelMemory?.init();
    LionelSettings?.init();
    LionelVoice?.init();
    LionelCameras?.init();
    LionelNotifications?.init();

    startIdleWatcher();
  }

  async function handleUserText(text) {
    if (!text) return;
    context.lastInteraction = Date.now();

    LionelMemory.saveInteraction("user", text);
    addUserBubble(text);

    const memoryContext = LionelMemory.getContext();
    const response = await LionelGemini.sendText(text, memoryContext);

    respond(response);
  }

  function respond(text) {
    if (!text) return;
    LionelMemory.saveInteraction("lionel", text);
    addLionelBubble(text);
    LionelVoice.speak(text);
  }

  function startIdleWatcher() {
    setInterval(() => {
      if (!context.proactiveEnabled || !context.lastInteraction) return;
      if (Date.now() - context.lastInteraction > 180000) {
        proactiveComment();
        context.lastInteraction = Date.now();
      }
    }, 30000);
  }

  async function proactiveComment() {
    const memoryContext = LionelMemory.getContext();
    const response = await LionelGemini.sendText(
      "Faça um comentário curto e amigável para o usuário.",
      memoryContext
    );
    respond(response);
  }

  function addUserBubble(text) {
    window.addLionelBubble?.(text, "user");
  }

  function addLionelBubble(text) {
    window.addLionelBubble?.(text, "lionel");
  }

  return { init, handleUserText };
})();

document.addEventListener("DOMContentLoaded", () => {
  LionelCore.init();
});
