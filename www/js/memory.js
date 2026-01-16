const Memory = {
  save(role, text) {
    let history = JSON.parse(localStorage.getItem("lionel_memory")) || [];
    history.push({ role, text });
    localStorage.setItem("lionel_memory", JSON.stringify(history));
  },

  load() {
    return JSON.parse(localStorage.getItem("lionel_memory")) || [];
  },

  clear() {
    localStorage.removeItem("lionel_memory");
  }
};
