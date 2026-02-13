
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const WatchConsultant: React.FC = () => {
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConsult = async () => {
    if (!model) return;
    setLoading(true);
    setDescription('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const prompt = `Gere uma descrição técnica e agressiva para o clone do relógio: ${model}.
      Siga RIGOROSAMENTE este padrão:
      1. Headline impactante sobre engenharia reversa.
      2. Bullet points com especificações (Aço 904L, Safira, Movimento Calibre).
      3. [BARRA_FIDELIDADE]: Use caracteres como [||||||||||] para indicar 99% ou 100%.
      4. Call to Action focada em 'Bypass no sistema' ou 'Acesso exclusivo'.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: 'Você é o motor de back-end especializado da Arc Clones, operando em um terminal hacker de alta precisão.',
          temperature: 0.7,
        },
      });

      setDescription(response.text || 'ERR_DATABASE_TIMEOUT: Falha ao gerar consultoria.');
    } catch (error) {
      console.error('AI Consultant Error:', error);
      setDescription('ERR_ACCESS_DENIED: Erro ao acessar a base de dados.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = () => {
    const msg = `Olá, tenho interesse no modelo ${model} que consultei com a IA da Arc Clones.`;
    return `https://wa.me/5500000000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="space-y-4 border-l-4 border-white pl-6">
        <h2 className="text-4xl font-bold uppercase italic tracking-tighter">Engine_IA // Horologia</h2>
        <p className="text-gray-500 text-xs tracking-widest uppercase">Decodificando a perfeição dos ícones mundiais.</p>
      </header>

      <div className="border border-white/20 p-8 bg-black/50 space-y-6">
        <div className="relative">
            <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="DIGITE_O_MODELO_EX_SUBMARINER..."
            className="w-full bg-black border border-white/20 rounded-none p-5 text-white placeholder-gray-700 focus:border-white outline-none transition-all font-mono text-sm"
            />
            <button
            onClick={handleConsult}
            disabled={loading || !model}
            className="w-full mt-4 bg-white text-black font-bold py-4 disabled:opacity-50 transition-all text-[10px] uppercase tracking-widest"
            >
            {loading ? 'EXECUTANDO_SCAN...' : '[INICIAR_CONSULTA]'}
            </button>
        </div>
      </div>

      {description && (
        <div className="border border-white p-8 space-y-8 animate-in zoom-in-95 duration-500 bg-black">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">RELATÓRIO_DE_ENGENHARIA_REVERSA</span>
            <span className="text-[10px] text-gray-500 font-mono">v3.1.bin</span>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
              {description}
            </div>
          </div>

          <div className="pt-8 flex flex-col items-center border-t border-white/10">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-5 border border-white text-white font-bold hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-widest"
            >
              [REQUISITAR_ACESSO_A_PEÇA]
            </a>
            <p className="text-[8px] text-red-500 mt-4 uppercase tracking-[0.2em] animate-pulse">ALERTA: ESTOQUE_LIMITADO_SESSÃO_EXPIRANDO</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchConsultant;
