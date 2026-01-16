/* =========================================================
   LIONEL VOICE – TTS e STT
   ========================================================= */

const LionelVoice = (() => {
  let recognition;
  let listeningCallback = null;

  function init() {
    console.log("LionelVoice iniciado");

    // Inicializa TTS
    if (!window.speechSynthesis) {
      console.warn("TTS não suportado neste navegador/celular");
    }

    // Inicializa STT
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        if (listeningCallback) listeningCallback(text);
      };
    }
  }

  function speak(text) {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = LionelSettings.getSetting("voice");
    if (voice) utterance.voice = speechSynthesis.getVoices().find(v => v.name === voice);
    speechSynthesis.speak(utterance);
  }

  function startListening(callback) {
    if (!recognition) return;
    listeningCallback = callback;
    recognition.start();
  }

  function stopListening() {
    if (!recognition) return;
    recognition.stop();
    listeningCallback = null;
  }

  return { init, speak, startListening, stopListening };
})();
