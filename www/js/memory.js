/* =========================================================
   LIONEL MEMORY – Guarda interações do usuário e IA
   ========================================================= */

const LionelMemory = (() => {
  const storageKey = "lionel_memory";
  let memoryData = [];

  function init() {
    const saved = localStorage.getItem(storageKey);
    memoryData = saved ? JSON.parse(saved) : [];
    console.log("LionelMemory iniciado:", memoryData.length, "interações carregadas");
  }

  function saveInteraction(author, text) {
    const timestamp = new Date().toISOString();
    memoryData.push({ author, text, timestamp });
    localStorage.setItem(storageKey, JSON.stringify(memoryData));
  }

  function getContext(limit = 10) {
    return memoryData.slice(-limit).map(i => `${i.author}: ${i.text}`).join("\n");
  }

  function clearMemory() {
    memoryData = [];
    localStorage.removeItem(storageKey);
  }

  return { init, saveInteraction, getContext, clearMemory };
})();
