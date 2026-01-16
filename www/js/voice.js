/* =========================================================
   LIONEL – VOICE ENGINE
   Fala, escuta e adaptação de tom
   Compatível com WebView / APK híbrido
   ========================================================= */

const LionelVoice = (() => {
  let recognition = null;
  let isListening = false;
  let selectedVoice = null;

  // Estado de adaptação
  let usageStats = {
    interactions: 0,
    prefersCalm: false,
    prefersShort: false
  };

  /* ---------- LOAD / SAVE ---------- */

  function loadVoiceStats() {
    try {
      const saved = localStorage.getItem("lionel_voice_stats");
      if (saved) usageStats = JSON.parse(saved);
    } catch (e) {
      console.warn("Voice stats load failed");
    }
  }

  function saveVoiceStats() {
    localStorage.setItem(
      "lionel_voice_stats",
      JSON.stringify(usageStats)
    );
  }

  /* ---------- VOICES ---------- */

  function getAvailableVoices() {
    return new Promise(resolve => {
      let voices = speechSynthesis.getVoices();
      if (voices.length) return resolve(voices);

      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices());
      };
    });
  }

  async function setVoiceByName(name) {
    const voices = await getAvailableVoices();
    selectedVoice = voices.find(v => v.name === name) || voices[0];
    localStorage.setItem("lionel_selected_voice", selectedVoice.name);
  }

  async function loadSavedVoice() {
    const savedName = localStorage.getItem("lionel_selected_voice");
    const voices = await getAvailableVoices();
    selectedVoice =
      voices.find(v => v.name === savedName) || voices[0];
  }

  /* ---------- SPEAK ---------- */

  function speak(text, options = {}) {
    if (!text) return;

    usageStats.interactions++;
    saveVoiceStats();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = selectedVoice;
    utterance.rate = options.rate ?? (usageStats.prefersCalm ? 0.9 : 1);
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  /* ---------- LISTEN ---------- */

  function startListening(onResult) {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported");
      return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = event => {
      const last =
        event.results[event.results.length - 1][0].transcript.trim();

      usageStats.interactions++;
      saveVoiceStats();

      if (typeof onResult === "function") {
        onResult(last);
      }
    };

    recognition.onerror = err => {
      console.error("Voice error:", err);
    };

    recognition.start();
    isListening = true;
  }

  function stopListening() {
    if (recognition && isListening) {
      recognition.stop();
      isListening = false;
    }
  }

  /* ---------- ADAPTATION ---------- */

  function adaptTone(feedback) {
    // feedback: "calm", "short", "normal"
    if (feedback === "calm") usageStats.prefersCalm = true;
    if (feedback === "short") usageStats.prefersShort = true;
    if (feedback === "normal") {
      usageStats.prefersCalm = false;
      usageStats.prefersShort = false;
    }
    saveVoiceStats();
  }

  /* ---------- INIT ---------- */

  async function init() {
    loadVoiceStats();
    await loadSavedVoice();
  }

  return {
    init,
    speak,
    startListening,
    stopListening,
    getAvailableVoices,
    setVoiceByName,
    adaptTone
  };
})();

/* Inicialização automática */
document.addEventListener("DOMContentLoaded", () => {
  LionelVoice.init();
});
