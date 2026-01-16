document.addEventListener('deviceready', () => {
    window.lionelMemory = JSON.parse(localStorage.getItem('lionel_memory')) || { chats: [], userStyle: {}, contacts: {} };
    loadSettings();
    renderHistory();
    startProactiveListener();
}, false);

function saveAll() {
    const config = {
        key: document.getElementById('apiKey').value,
        ai: document.getElementById('aiName').value,
        user: document.getElementById('userName').value,
        persona: document.getElementById('personaBio').value,
        cams: [document.getElementById('cam1').value, document.getElementById('cam2').value],
        audio: document.getElementById('audioSrc').value
    };
    localStorage.setItem('lionel_config', JSON.stringify(config));
    toggleSettings();
    addMsg("Lionel", `Configurações atualizadas, ${config.user}. Estou pronto.`);
}

function processInput() {
    const el = document.getElementById('mainInput');
    const text = el.value.trim();
    if(!text) return;

    addMsg("User", text);
    el.value = "";

    // Lógica de Proatividade e Inteligência
    setTimeout(() => {
        let response = "";
        if(text.toLowerCase().includes("ajuda")) {
            response = "Estou analisando o contexto agora. Vou te dar sugestões baseadas no seu jeito de falar.";
        } else if(text.toLowerCase().includes("pix")) {
            response = "Atenção: Ação financeira detectada. Léo, confirme se os dados estão corretos antes de eu usar minhas garras.";
        } else {
            response = "Entendido. Memorizado e pronto para evoluir com essa informação.";
        }
        addMsg("Lionel", response);
        learnFromUser(text);
    }, 800);
}

function learnFromUser(input) {
    // Mimetismo de estilo e memória de longo prazo
    window.lionelMemory.chats.push({t: Date.now(), msg: input});
    localStorage.setItem('lionel_memory', JSON.stringify(window.lionelMemory));
}

function addMsg(sender, text) {
    const container = document.getElementById('chat-container');
    const div = document.createElement('div');
    div.className = `msg ${sender === 'User' ? 'user' : 'lionel'}`;
    div.innerText = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function toggleSettings() {
    document.getElementById('settings').classList.toggle('active');
}

function startProactiveListener() {
    // Simulação de escuta proativa (Numbers/Dates)
    console.log("Lionel ouvindo ambiente...");
}

function loadSettings() {
    const s = JSON.parse(localStorage.getItem('lionel_config'));
    if(s) {
        document.getElementById('apiKey').value = s.key;
        document.getElementById('aiName').value = s.ai;
        document.getElementById('userName').value = s.user;
    }
}
