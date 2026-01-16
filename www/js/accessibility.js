// Lionel v4 - Módulo de Acessibilidade e Garras
(function() {
    "use strict";

    const LionelGarras = {
        // Analisa o que aparece na tela (mensagens, botões, textos)
        aoMudarTela: function(evento) {
            const textoTela = evento.text || "";
            const pacoteApp = evento.packageName || "";

            // 1. Filtro de Prioridades (Pai, Irmã, Hospital, Trabalho)
            const prioridades = ["pai", "irmã", "hospital", "trabalho", "urgente", "pix"];
            prioridades.forEach(p => {
                if (textoTela.toLowerCase().includes(p)) {
                    // Lionel avisa proativamente no fone ou notificação
                    console.log(`[Lionel] Prioridade detectada em ${pacoteApp}: ${textoTela}`);
                }
            });

            // 2. Sugestões de Improviso (Se detectar que você está numa conversa)
            if (pacoteApp.includes("whatsapp") || pacoteApp.includes("telephony")) {
                this.analisarContextoSocial(textoTela);
            }
        },

        // Sugere respostas ou ações como salvar números e alarmes
        analisarContextoSocial: function(texto) {
            const regexTel = /(\d{2})?\s?9?\d{4}-?\d{4}/;
            if (regexTel.test(texto)) {
                // Aqui o Lionel falaria: "Léo, quer que eu salve esse número?"
                console.log("[Lionel] Sugestão: Salvar contato detectado.");
            }
        },

        // Trava de Segurança para ações financeiras
        segurancaCritica: function(textoBotao) {
            if (textoBotao.toLowerCase().includes("confirmar") || textoBotao.toLowerCase().includes("enviar")) {
                // Lionel pergunta antes de deixar o clique acontecer
                return confirm("Lionel: Léo, detectei uma ação importante. Posso prosseguir com as garras?");
            }
            return true;
        }
    };

    // Comunicação com o sistema Android (via Plugin de Acessibilidade)
    window.addEventListener("accessibilityevent", (e) => LionelGarras.aoMudarTela(e));

})();
