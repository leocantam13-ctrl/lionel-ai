// ===============================
// STT.JS — RECONHECIMENTO DE VOZ
// ===============================

let recognition = null;
let listening = false;

export function initSTT(onResultCallback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("STT não suportado neste dispositivo.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    const text = last[0].transcript.trim();
    if (text && onResultCallback) {
      onResultCallback(text);
    }
  };

  recognition.onerror = (err) => {
    console.error("Erro STT:", err);
    stopListening();
  };

  recognition.onend = () => {
    if (listening) {
      recognition.start(); // mantém escutando
    }
  };
}

export function startListening() {
  if (!recognition || listening) return;
  listening = true;
  recognition.start();
}

export function stopListening() {
  listening = false;
  if (recognition) recognition.stop();
}
