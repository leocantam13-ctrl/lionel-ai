/* =========================================================
   LIONEL – GEMINI ENGINE
   Conexão com API Gemini (texto + imagem)
   ========================================================= */

const LionelGemini = (() => {
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  function getApiKey() {
    return localStorage.getItem("lionel_api_key");
  }

  function setApiKey(key) {
    localStorage.setItem("lionel_api_key", key);
  }

  async function sendText(prompt, context = "") {
    const apiKey = getApiKey();
    if (!apiKey) {
      return "Nenhuma chave de API configurada.";
    }

    try {
      const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: context },
                { text: prompt }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Não consegui gerar uma resposta agora."
      );
    } catch (e) {
      console.error("Gemini error:", e);
      return "Erro ao conectar com a IA.";
    }
  }

  async function analyzeImage(base64Image, prompt = "Descreva a imagem") {
    const apiKey = getApiKey();
    if (!apiKey) return "API não configurada.";

    try {
      const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Image
                  }
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Não consegui analisar a imagem."
      );
    } catch (e) {
      console.error(e);
      return "Erro ao analisar imagem.";
    }
  }

  return {
    setApiKey,
    sendText,
    analyzeImage
  };
})();
