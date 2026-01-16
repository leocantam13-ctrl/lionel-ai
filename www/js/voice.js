let recognition;

function startListening(callback) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "pt-BR";
  recognition.onresult = e => callback(e.results[0][0].transcript);
  recognition.start();
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "pt-BR";
  speechSynthesis.speak(utter);
}
