document.addEventListener('deviceready', () => {
    loadSettings();
    startCamera();
    displayHistory();
    iniciarSentinela();
}, false);

function toggleMenu() {
    const s = document.getElementById('settings');
    s.style.display = s.style.display === 'block' ? 'none' : 'block';
}

function saveAll() {
    const config = { key: document.getElementById('apiKey').value, user: document.getElementById('userName').value, bio: document.getElementById('aiBio').value };
    localStorage.setItem('lionel_config', JSON.stringify(config));
    toggleMenu();
    falar("Configurações aplicadas, Léo. Estou pronto para o dia.");
}

function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => { document.getElementById('video-preview').srcObject = stream; })
        .catch(e => console.log("Câmera OFF"));
}

function falar(texto) {
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

async function processInput() {
    const el = document.getElementById('mainInput');
    const text = el.value.trim();
    if (!text) return;
    addMsg(text, 'user-msg');
    el.value = "";
    const config = JSON.parse(localStorage.getItem('lionel_config'));
    if (!config || !config.key) { addMsg("Léo, preciso da sua Chave API.", 'lionel-msg'); return; }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.key}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Você é o Lionel, o Kwami do ${config.user}. Bio: ${config.bio}. O Léo diz: ${text}` }] }] })
        });
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        addMsg(reply, 'lionel-msg');
        falar(reply);
        saveChat(text, reply);
    } catch (e) { addMsg("Erro de conexão.", 'lionel-msg'); }
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
    let hist = JSON.parse(localStorage.getItem('lionel_history')) || [];
    hist.push({ u, l, d: new Date().toLocaleDateString() });
    localStorage.setItem('lionel_history', JSON.stringify(hist));
}

function displayHistory() {
    let hist = JSON.parse(localStorage.getItem('lionel_history')) || [];
    hist.forEach(h => { addMsg(h.u, 'user-msg'); addMsg(h.l, 'lionel-msg'); });
}

function iniciarSentinela() {
    setInterval(() => { console.log("Lionel vigiando..."); }, 5000);
}
