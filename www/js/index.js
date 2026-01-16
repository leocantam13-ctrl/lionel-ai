document.addEventListener('deviceready', onDeviceReady, false);

let userPersona = "Léo";
let history = [];

function onDeviceReady() {
    console.log('Lionel v4 Desperto');
    setupA11y(); // Inicia Garras de Acessibilidade
    loadMemory(); // Carrega Gostos e Padrões do usuário
}

// Função para enviar mensagem e processar proatividade
function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    
    if (text === "") return;

    addChatMessage(text, 'user-msg');
    processLionelIntelligence(text);
    input.value = "";
}

function addChatMessage(text, type) {
    const chatFlow = document.getElementById('chat-flow');
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    chatFlow.appendChild(div);
    chatFlow.scrollTop = chatFlow.scrollHeight;
}

// O Coração: Inteligência e Aprendizado
async function processLionelIntelligence(input) {
    // 1. Simulação de análise de contexto
    if(input.toLowerCase().includes("ajuda na entrevista")) {
        addChatMessage("Modo Entrevista ativado. Vou ouvir o recrutador e te sugerir respostas no fone usando seu estilo habitual, Léo.", 'lionel-msg');
    } 
    else if(input.toLowerCase().includes("pix")) {
        addChatMessage("Ação de PIX detectada. Léo, confirme os dados antes de eu usar minhas garras para concluir. Segurança em primeiro lugar.", 'lionel-msg');
    }
    else {
        // Resposta padrão adaptativa
        setTimeout(() => {
            addChatMessage("Entendido. Memorizei essa nova instrução e vou aplicar ao meu comportamento proativo agora.", 'lionel-msg');
        }, 1000);
    }
    
    // Salva na memória de longo prazo
    saveToMemory(input);
}

function saveToMemory(data) {
    history.push({date: new Date(), content: data});
    localStorage.setItem('lionel_memory', JSON.stringify(history));
}

function loadMemory() {
    const mem = localStorage.getItem('lionel_memory');
    if(mem) history = JSON.parse(mem);
}

function toggleMenu() {
    document.getElementById('settings').classList.toggle('active');
}

document.getElementById('sendBtn').addEventListener('click', sendMessage);
