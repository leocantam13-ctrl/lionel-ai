/* =========================================================
   LIONEL – CORE BRAIN (index.js)
   Orquestrador geral: memória, voz, contexto e proatividade
   ========================================================= */

/* ---------- ESTADO GLOBAL ---------- */

const LionelCore = (() => {
  let context = {
    lastInteraction: null,
    proactiveEnabled: true,
    listening: false
  };

  /* ---------- INIT ---------- */

  function init() {
    console.log("Lionel iniciado");

    if (window.LionelMemory) {
      LionelMemory.init();
    }

    if (window.LionelSettings) {
      LionelSettings.init();
    }

    if (window.LionelVoice) {
      LionelVoice.init();
    }

    startIdleWatcher();
  }

  /* ---------- INTERAÇÃO ---------- */

  function handleUserText(text) {
    if (!text) return;

    context.lastInteraction = Date.now();

    if (window.LionelMemory) {
      LionelMemory.saveInteraction("user", text);
    }

    const response = generateResponse(text);

    speakResponse(response);
  }

  function generateResponse(text) {
    // Base inicial – depois será substituída por Gemini API
    const lower = text.toLowerCase();

    if (lower.includes("quem é você")) {
      return "Sou o Lionel. Estou aqui para te acompanhar no dia a dia.";
    }

    if (lower.includes("fica quieto")) {
      context.proactiveEnabled = false;
      return "Tudo bem. Vou ficar mais quieto por enquanto.";
    }

    if (lower.includes("pode falar")) {
      context.proactiveEnabled = true;
      return "Certo. Volto a comentar quando achar necessário.";
    }

    return "Entendi. Vou levar isso em conta.";
  }

  function speakResponse(text) {
    if (window.LionelVoice) {
      LionelVoice.speak(text);
    }

    if (window.LionelMemory) {
      LionelMemory.saveInteraction("lionel", text);
    }
  }

  /* ---------- VOZ ---------- */

  function startVoiceMode() {
    if (!window.LionelVoice) return;

    if (context.listening) return;

    LionelVoice.startListening(result => {
      handleUserText(result);
    });

    context.listening = true;
  }

  function stopVoiceMode() {
    if (!window.LionelVoice) return;

    LionelVoice.stopListening();
    context.listening = false;
  }

  /* ---------- PROATIVIDADE ---------- */

  function startIdleWatcher() {
    setInterval(() => {
      if (!context.proactiveEnabled) return;

      const now = Date.now();
      if (!context.lastInteraction) return;

      const idleTime = now - context.lastInteraction;

      // 2 minutos sem interação
      if (idleTime > 120000) {
        proactiveComment();
        context.lastInteraction = now;
      }
    }, 30000);
  }

  function proactiveComment() {
    const phrases = [
      "Se quiser, posso te ajudar em algo agora.",
      "Estou aqui, caso precise.",
      "Quer que eu fique de olho em alguma coisa?"
    ];

    const msg =
      phrases[Math.floor(Math.random() * phrases.length)];

    speakResponse(msg);
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
