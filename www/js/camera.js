/* =========================================================
   LIONEL CAMERAS – Conexão com IP / Wi-Fi
   ========================================================= */

const LionelCameras = (() => {
  let cameras = [];

  function init() {
    cameras = LionelSettings.getSetting("cameraIPs") || [];
    console.log("Câmeras carregadas:", cameras);
  }

  function addCamera(ip) {
    if (cameras.length >= 5) return console.warn("Máximo de 5 câmeras atingido");
    cameras.push(ip);
    LionelSettings.addCamera(ip);
  }

  function removeCamera(ip) {
    cameras = cameras.filter(c => c !== ip);
    LionelSettings.removeCamera(ip);
  }

  function getStreams() {
    return cameras.map(ip => `http://${ip}/stream`);
  }

  return { init, addCamera, removeCamera, getStreams };
})();
