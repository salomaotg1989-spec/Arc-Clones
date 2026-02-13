
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
      
      const prompt = `Gere uma descrição de luxo para o relógio: ${model}.
      Siga RIGOROSAMENTE este padrão:
      1. Headline chamativa (Ex: O ápice da precisão suíça).
      2. Bullet points com especificações técnicas (foco em materiais premium).
      3. [BARRA_FIDELIDADE]: Use símbolos visuais para mostrar 99% ou 100% de proximidade.
      4. Call to Action focada em exclusividade.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: 'Você é o motor de back-end especializado da Arc Clones, focado em alta horologia e persuasão de luxo.',
          temperature: 0.7,
        },
      });

      setDescription(response.text || 'Falha ao gerar consultoria.');
    } catch (error) {
      console.error('AI Consultant Error:', error);
      setDescription('Erro ao acessar a base de dados de horologia.');
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
      <header className="space-y-4">
        <h2 className="text-4xl luxury-text gold-gradient">Consultor de Alta Horologia</h2>
        <p className="text-gray-400 font-light">Informe o modelo desejado e nossa IA gerará o dossiê técnico completo com foco em fidelidade.</p>
      </header>

      <div className="glass-panel p-8 rounded-3xl gold-border space-y-6">
        <div className="relative">
            <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Ex: Rolex Daytona Rainbow..."
            className="w-full bg-black/40 border border-yellow-900/30 rounded-2xl p-5 text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all"
            />
            <button
            onClick={handleConsult}
            disabled={loading || !model}
            className="absolute right-3 top-3 bottom-3 px-6 gold-bg text-black font-bold rounded-xl disabled:opacity-50 transition-all text-xs uppercase tracking-widest"
            >
            {loading ? 'Consultando...' : 'Consultar IA'}
            </button>
        </div>
      </div>

      {description && (
        <div className="glass-panel p-10 rounded-3xl gold-border space-y-8 animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between border-b border-yellow-900/20 pb-4">
            <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-[0.3em]">Dossiê Técnico Arc Clones</span>
            <span className="text-xs text-gray-500">IA Engine v3.1</span>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap font-light">
              {description}
            </div>
          </div>

          <div className="pt-8 flex flex-col items-center border-t border-yellow-900/20">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 gold-bg text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)] uppercase text-xs tracking-widest"
            >
              Adquirir Peça Exclusiva
            </a>
            <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest">Apenas 3 unidades em estoque para este modelo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchConsultant;
