const LionelSettings = (() => {
  let apiKey = localStorage.getItem("apiKey") || "";
  let userName = localStorage.getItem("userName") || "Usuário";
  let voice = localStorage.getItem("voice") || "default";

  function init() {}

  function saveApiKey(key) { apiKey = key; localStorage.setItem("apiKey", key); }
  function saveUserName(name) { userName = name; localStorage.setItem("userName", name); }
  function changeVoice(v) { voice = v; localStorage.setItem("voice", v); }

  function getApiKey() { return apiKey; }
  function getUserName() { return userName; }
  function getVoice() { return voice; }

  return { init, saveApiKey, saveUserName, changeVoice, getApiKey, getUserName, getVoice };
})();
