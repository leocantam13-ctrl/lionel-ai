document.addEventListener('deviceready', () => {
    loadSettings();
    startCamera();
    displayHistory();
}, false);

function toggleMenu() {
    const s = document.getElementById('settings');
    s.style.display = s.style.display === 'block' ? 'none' : 'block';
}

function saveAll() {
    const config = {
        key: document.getElementById('apiKey').value,
        user: document.getElementById('userName').value,
        bio: document.getElementById('aiBio').value,
        ip: document.getElementById('camIp').value
    };
    localStorage.setItem('lionel_config', JSON.stringify(config));
    alert("Lionel Atualizado!");
    toggleMenu();
}

function startCamera() {
    const video = document.getElementById('video-preview');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => { video.srcObject = stream; })
        .catch(err => console.log("Câmera local desativada ou erro: ", err));
}

async function processInput() {
    const el = document.getElementById('mainInput');
    const text = el.value.trim();
    if (!text) return;

    addMsg(text, 'user-msg');
    el.value = "";

    const config = JSON.parse(localStorage.getItem('lionel_config'));
    if (!config || !config.key) {
        addMsg("Léo, preciso da sua Chave API nas configurações para pensar.", 'lionel-msg');
        return;
    }

    try {
        // Conexão real com Gemini API (Exemplo)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.key}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Você é o Lionel, companheiro do ${config.user}. Instruções: ${config.bio}. Usuário diz: ${text}` }] }] })
        });
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        
        addMsg(reply, 'lionel-msg');
        saveChat(text, reply);
    } catch (e) {
        addMsg("Erro ao conectar ao meu cérebro. Verifique a chave e a internet.", 'lionel-msg');
    }
}

function addMsg(text, type) {
    const flow = document.getElementById('chat-flow');
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    flow.appendChild(div);
    flow.scrollTop = flow.scrollHeight;
}

function saveChat(u, l) {
    let history = JSON.parse(localStorage.getItem('lionel_history')) || [];
    history.push({ user: u, lionel: l, date: new Date().toLocaleDateString() });
    localStorage.setItem('lionel_history', JSON.stringify(history));
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('lionel_history')) || [];
    history.forEach(h => {
        addMsg(h.user, 'user-msg');
        addMsg(h.lionel, 'lionel-msg');
    });
}
