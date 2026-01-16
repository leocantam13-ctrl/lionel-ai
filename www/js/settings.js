/* =========================================================
   LIONEL SETTINGS – Configurações do usuário
   ========================================================= */

const LionelSettings = (() => {
  const storageKey = "lionel_settings";
  let settings = {
    username: "Usuário",
    voice: "default",
    apiKey: "",
    cameraIPs: [],
  };

  function init() {
    const saved = localStorage.getItem(storageKey);
    settings = saved ? JSON.parse(saved) : settings;
    console.log("LionelSettings carregado:", settings);
  }

  function setSetting(key, value) {
    settings[key] = value;
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }

  function getSetting(key) {
    return settings[key];
  }

  function addCamera(ip) {
    if (!settings.cameraIPs.includes(ip)) settings.cameraIPs.push(ip);
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }

  function removeCamera(ip) {
    settings.cameraIPs = settings.cameraIPs.filter(c => c !== ip);
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }

  return { init, setSetting, getSetting, addCamera, removeCamera };
})();
