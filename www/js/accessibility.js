(function() {
    window.addEventListener("accessibilityevent", (e) => {
        const texto = e.text || "";
        const app = e.packageName || "";
        
        // Prioridades (Pai, Irmã, PIX)
        if (texto.toLowerCase().includes("pix") || texto.toLowerCase().includes("enviar")) {
            if(confirm("Lionel: Ação financeira detectada. Posso prosseguir com as garras, Léo?")) {
                console.log("Clique autorizado.");
            }
        }

        // Proatividade: Captura de números/horários
        if (texto.match(/\d{2}:\d{2}/)) {
            falar("Léo, detetei um horário. Queres que eu crie um lembrete?");
        }
    });
})();
