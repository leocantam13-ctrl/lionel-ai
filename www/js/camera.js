// ===============================
// CAMERA.JS — GERENCIAMENTO DE CÂMERAS
// ===============================

const CameraManager = (() => {
  const maxCameras = 4; // limite de câmeras conectadas
  let cameras = []; // {name, url, streamElement}

  function addCamera(name, url) {
    if (cameras.length >= maxCameras) {
      console.warn("Limite de câmeras atingido");
      return false;
    }

    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.controls = false;
    video.style.width = "100%";
    video.style.height = "auto";

    // Usando stream via URL (IP/RTSP compatível via HTML5)
    video.src = url;
    video.onerror = () => console.error(`Erro na câmera: ${name}`);

    cameras.push({ name, url, streamElement: video });
    updateCameraUI();
    return true;
  }

  function removeCamera(name) {
    const index = cameras.findIndex(c => c.name === name);
    if (index !== -1) {
      const cam = cameras.splice(index, 1)[0];
      cam.streamElement.remove();
      updateCameraUI();
      return true;
    }
    return false;
  }

  function updateCameraUI() {
    const container = document.getElementById("cameraContainer");
    if (!container) return;

    container.innerHTML = "";
    cameras.forEach(cam => {
      const wrapper = document.createElement("div");
      wrapper.className = "cameraWrapper";
      const label = document.createElement("p");
      label.textContent = cam.name;
      wrapper.appendChild(label);
      wrapper.appendChild(cam.streamElement);
      container.appendChild(wrapper);
    });
  }

  function getCameras() {
    return cameras.map(c => ({ name: c.name, url: c.url }));
  }

  return {
    addCamera,
    removeCamera,
    getCameras
  };
})();
