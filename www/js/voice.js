const LionelVoice = (() => {
  function init() { console.log("Voz iniciada"); }

  function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    const voice = LionelSettings.getVoice();
    if(voice === "male") utter.pitch = 0.8;
    else if(voice === "female") utter.pitch = 1.2;
    speechSynthesis.speak(utter);
  }

  function startListening(callback) {
    if(!('webkitSpeechRecognition' in window)) return;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.onresult = e => callback(e.results[0][0].transcript);
    recognition.start();
  }

  function stopListening() { console.log("Stop listening"); }

  return { init, speak, startListening, stopListening };
})();
