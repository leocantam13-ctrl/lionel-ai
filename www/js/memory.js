// ================================
// LIONEL - MEMORY CORE
// memory.js
// ================================

// Chave única no localStorage
const MEMORY_KEY = "lionel_memory_v1";

// ---------- LOAD ----------
export function loadMemory() {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (!raw) {
      const initial = {
        data: {},
        history: {},
        meta: {
          createdAt: Date.now(),
          version: 1
        }
      };
      localStorage.setItem(MEMORY_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao carregar memória:", e);
    return { data: {}, history: {}, meta: {} };
  }
}

// ---------- SAVE ----------
function saveMemory(memory) {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

// ---------- BASIC MEMORY ----------
export function remember(key, value) {
  const memory = loadMemory();
  memory.data[key] = value;
  saveMemory(memory);
}

export function recall(key) {
  const memory = loadMemory();
  return memory.data[key];
}

export function forget(key) {
  const memory = loadMemory();
  delete memory.data[key];
  saveMemory(memory);
}

// ---------- CHAT HISTORY ----------
export function addHistory(chatId, role, message) {
  const memory = loadMemory();

  if (!memory.history[chatId]) {
    memory.history[chatId] = [];
  }

  memory.history[chatId].push({
    role,
    message,
    timestamp: Date.now()
  });

  saveMemory(memory);
}

export function getHistory(chatId = null) {
  const memory = loadMemory();
  if (chatId) return memory.history[chatId] || [];
  return memory.history;
}

// ---------- ADVANCED HELPERS ----------
export function rememberIfNotExists(key, value) {
  const memory = loadMemory();
  if (memory.data[key] === undefined) {
    memory.data[key] = value;
    saveMemory(memory);
  }
}

export function clearAllMemory() {
  localStorage.removeItem(MEMORY_KEY);
}
