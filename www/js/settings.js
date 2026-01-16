// settings.js - Preferências do usuário e API
const LionelSettings = (() => {
  let userName = "Usuário";
  let apiKey = "";

  function init() {
    const stored = JSON.parse(localStorage.getItem("lionelSettings") || "{}");
    if(stored.userName) userName = stored.userName;
    if(stored.apiKey) apiKey = stored.apiKey;
  }

  function setUserName(name) {
    userName = name;
    save();
  }

  function setApiKey(key) {
    apiKey = key;
    save();
  }

  function getApiKey() {
    return apiKey;
  }

  function save() {
    localStorage.setItem("lionelSettings", JSON.stringify({ userName, apiKey }));
  }

  return { init, setUserName, setApiKey, getApiKey };
})();
