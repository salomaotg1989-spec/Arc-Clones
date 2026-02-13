
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const TextGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState('creative');

  const tasks = [
    { id: 'creative', label: 'Storytelling', icon: '🎭', instruction: 'You are a master storyteller. Write engaging, vivid narratives.' },
    { id: 'code', label: 'Tech Expert', icon: '💻', instruction: 'You are a senior software engineer. Provide clean, documented code and explanations.' },
    { id: 'analysis', label: 'Insight Analyst', icon: '📊', instruction: 'You are a strategic analyst. Provide data-driven insights and structured reports.' },
    { id: 'proofread', label: 'Editor', icon: '📝', instruction: 'You are a meticulous editor. Improve the following text for clarity and impact.' },
  ];

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    setOutput('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const currentTask = tasks.find(t => t.id === task);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: currentTask?.instruction,
          temperature: 0.8,
        },
      });

      setOutput(response.text || 'No response generated.');
    } catch (error) {
      console.error('Text Generation Error:', error);
      setOutput('An error occurred during generation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold gradient-text">Neural Composer</h2>
        <p className="text-gray-400">Collaborate with Gemini to create high-impact content across any domain.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tasks.map((t) => (
          <button
            key={t.id}
            onClick={() => setTask(t.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              task === t.id 
                ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-300' 
                : 'bg-gray-900/40 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            <span className="text-2xl">{t.icon}</span>
            <span className="text-xs font-bold uppercase tracking-wider">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt, context, or raw text here..."
          className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl p-6 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none h-48 resize-none shadow-inner"
        />
        
        <button
          onClick={handleGenerate}
          disabled={loading || !input}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Synthesizing...
            </>
          ) : (
            <>
              🚀 Generate Output
            </>
          )}
        </button>
      </div>

      {output && (
        <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-indigo-500 space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Model Output</span>
            <button 
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-gray-500 hover:text-indigo-400 text-sm transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="prose prose-invert max-w-none text-gray-200 leading-relaxed whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
