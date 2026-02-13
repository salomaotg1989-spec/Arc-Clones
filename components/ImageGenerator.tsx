
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState('1:1');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
          }
        },
      });

      const newImages: string[] = [];
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          newImages.push(imageUrl);
        }
      }
      setImages(prev => [...newImages, ...prev]);
    } catch (error) {
      console.error('Image Generation Error:', error);
      alert('Failed to generate image. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold gradient-text">Visionary Canvas</h2>
        <p className="text-gray-400">Describe anything you can imagine, and Gemini will bring it to life.</p>
      </header>

      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A futuristic cybernetic city floating in the clouds, neon purple lighting, cinematic 8k..."
          className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-32 resize-none"
        />
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 font-medium">Aspect Ratio:</span>
            <select 
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="1:1">1:1 Square</option>
              <option value="16:9">16:9 Widescreen</option>
              <option value="9:16">9:16 Portrait</option>
              <option value="4:3">4:3 Desktop</option>
            </select>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="flex-1 md:flex-none md:ml-auto bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Manifesting...
              </>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
        {images.map((img, idx) => (
          <div key={idx} className="group relative glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <img src={img} alt="Generated asset" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = img;
                  link.download = `gemini-gen-${Date.now()}.png`;
                  link.click();
                }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-colors"
                title="Download"
              >
                💾
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-dashed border-2 border-gray-800">
            <span className="text-6xl mb-4 block">✨</span>
            <p className="text-gray-500 font-medium">Your generated masterpieces will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
