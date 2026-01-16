/* =========================================================
   LIONEL NOTIFICATIONS – Ler notificações e prioridades
   ========================================================= */

const LionelNotifications = (() => {
  function init() {
    console.log("LionelNotifications iniciado");
    // No Cordova: implementar com plugin Notification Listener
  }

  function handleNotification(title, text, packageName) {
    console.log("Notificação recebida:", title, text, packageName);
    // Aqui você pode definir prioridade
  }

  return { init, handleNotification };
})();
