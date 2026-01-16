// memory.js
const MEMORY_KEY = "lionel_memory_v1";

export function loadMemory() {
  const raw = localStorage.getItem(MEMORY_KEY);
  return raw ? JSON.parse(raw) : {
    userName: "Léo",
    priorities: [],
    people: {},
    habits: {},
    preferences: {},
    history: []
  };
}

export function saveMemory(memory) {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

export function remember(key, value) {
  const memory = loadMemory();
  memory[key] = value;
  saveMemory(memory);
}

export function addHistory(entry) {
  const memory = loadMemory();
  memory.history.push({
    text: entry,
    date: new Date().toISOString()
  });
  saveMemory(memory);
}
