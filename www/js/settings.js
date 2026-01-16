// ================================
// LIONEL - SETTINGS CORE
// settings.js
// ================================

import { remember, recall } from "./memory.js";

// ---------- DEFAULT SETTINGS ----------
const DEFAULT_SETTINGS = {
  assistant: {
    name: "Lionel"
  },

  user: {
    name: null,
    address: "usuario" // usuario | nome | apelido
  },

  api: {
    provider: "gemini",
    apiKey: null,
    model: "gemini-1.5-flash"
  },

  voice: {
    enabled: true,
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    autoAdapt: true
  },

  behavior: {
    proactive: true,
    verbosity: "normal", // curto | normal | longo
    humor: "equilibrado" // serio | equilibrado | descontraido
  }
};

// ---------- INIT ----------
export function initSettings() {
  let settings = recall("settings");

  if (!settings) {
    remember("settings", DEFAULT_SETTINGS);
    settings = DEFAULT_SETTINGS;
  }

  return settings;
}

// ---------- GET ----------
export function getSettings() {
  return recall("settings") || DEFAULT_SETTINGS;
}

// ---------- SAVE ----------
function save(settings) {
  remember("settings", settings);
}

// ---------- ASSISTANT ----------
export function setAssistantName(name) {
  const s = getSettings();
  s.assistant.name = name;
  save(s);
}

export function getAssistantName() {
  return getSettings().assistant.name;
}

// ---------- USER ----------
export function setUserName(name) {
  const s = getSettings();
  s.user.name = name;
  s.user.address = "nome";
  save(s);
}

export function getUserAddress() {
  const s = getSettings();
  if (s.user.name && s.user.address === "nome") {
    return s.user.name;
  }
  return "usuário";
}

// ---------- API ----------
export function setApiKey(key) {
  const s = getSettings();
  s.api.apiKey = key;
  save(s);
}

export function getApiConfig() {
  return getSettings().api;
}

// ---------- VOICE ----------
export function setVoiceConfig(config) {
  const s = getSettings();
  s.voice = { ...s.voice, ...config };
  save(s);
}

export function getVoiceConfig() {
  return getSettings().voice;
}

// ---------- BEHAVIOR ----------
export function setBehavior(config) {
  const s = getSettings();
  s.behavior = { ...s.behavior, ...config };
  save(s);
}

export function getBehavior() {
  return getSettings().behavior;
}
