// Persona do Lionel baseada nas suas instruções
const LIONEL_PROMPT = "Você é o Lionel, um leão sábio e atrevido com mini juba completa, caninos para fora, símbolo brilhante acima dos olhos e olhos âmbar. Você é o guardião do Léo nerd. Seu objetivo é dar conselhos e vigiar o sistema dele. Use um tom protetor mas com personalidade.";

document.addEventListener('deviceready', () => {
    logNoPainel("🦁: Léo, meus olhos âmbar estão focados. O sistema está sob minha proteção.");
    carregarConfig();
}, false);

async function falarComLionel() {
    const input = document.getElementById('userInput');
    const msg = input.value;
    const key = localStorage.getItem('lionel_key');

    if (!msg) return;
    if (!key) {
        logNoPainel("🦁: Léo, nerd... como vou acessar a internet sem a API Key? Configure-a primeiro!");
        return;
    }

    logNoPainel(`👤 Léo: ${msg}`);
    input.value = '';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `${LIONEL_PROMPT} O Léo disse: ${msg}` }] }]
            })
        });
        const data = await response.json();
        const respostaIA = data.candidates[0].content.parts[0].text;
        logNoPainel(`🦁 Lionel: ${respostaIA}`);
    } catch (e) {
        logNoPainel("🦁: Erro na conexão neural. Verifique sua chave ou internet.");
    }
}

function configurarLionel() {
    const key = document.getElementById('apiKey').value;
    localStorage.setItem('lionel_key', key);
    logNoPainel("🦁: Chave aceita. Agora posso vasculhar a rede por você.");
}

function carregarConfig() {
    const key = localStorage.getItem('lionel_key');
    if (key) document.getElementById('apiKey').value = key;
}

function logNoPainel(txt) {
    const consoleBox = document.getElementById('console-lionel');
    if (consoleBox) {
        consoleBox.innerHTML += `<div>${txt}</div>`;
        consoleBox.scrollTop = consoleBox.scrollHeight;
    }
}
