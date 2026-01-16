// ===============================
// PROACTIVE.JS — PROATIVIDADE COM CÂMERAS E ALERTAS
// ===============================

const LionelProactive = (() => {
  const checkInterval = 15000; // checa a cada 15s

  function start() {
    setInterval(() => {
      monitorCameras();
      monitorNotifications();
    }, checkInterval);
  }

  function monitorCameras() {
    const cameras = CameraManager.getCameras();

    cameras.forEach(cam => {
      const video = cam.streamElement;
      if (!video) return;

      // Aqui poderia integrar ML/visão real
      // Exemplo básico: se vídeo estiver pausado/erro, alerta
      if (video.readyState < 3) {
        LionelCore.handleUserText(
          `A câmera ${cam.name} parece não estar transmitindo.`
        );
      }
    });
  }

  function monitorNotifications() {
    // Exemplo: checar notificações importantes da memória
    const alerts = LionelMemory?.getCriticalAlerts?.() || [];
    alerts.forEach(alert => {
      LionelCore.handleUserText(
        `Alerta importante: ${alert}`
      );
    });
  }

  return {
    start
  };
})();
