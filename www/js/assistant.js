// ===============================
// ASSISTANT.JS — LIONEL TOTALMENTE PROATIVO
// ===============================

const LionelAssistant = (() => {
  const contextCheckInterval = 10000; // checa a cada 10s

  function start() {
    setInterval(() => {
      checkCameraContext();
      checkMemoryContext();
    }, contextCheckInterval);
  }

  function checkCameraContext() {
    const cameras = CameraManager.getCameras();

    cameras.forEach(cam => {
      const video = cam.streamElement;
      if (!video) return;

      // Exemplo básico de detecção: verificar se há atividade (simulação)
      // Futuro: ML/visão computacional
      if (Math.random() < 0.05) { // 5% de chance de comentar
        const comment = `Notei algo na câmera ${cam.name}.`;
        LionelCore.handleUserText(comment);
      }
    });
  }

  function checkMemoryContext() {
    // Observar notificações, eventos importantes, interações passadas
    const alerts = LionelMemory?.getCriticalAlerts?.() || [];
    alerts.forEach(alert => {
      LionelCore.handleUserText(`Alerta de memória: ${alert}`);
    });
  }

  return {
    start
  };
})();
