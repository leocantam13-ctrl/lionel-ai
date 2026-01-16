// Reconhecimento de voz
const LionelSTT = (() => {
  function init(callback) {
    if(!('webkitSpeechRecognition' in window)) return;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.onresult = e => callback(e.results[0][0].transcript);
  }
})();
