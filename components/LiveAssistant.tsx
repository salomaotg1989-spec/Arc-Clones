
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { createBlob, decode, decodeAudioData } from '../services/audio';

const LiveAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcriptions, setTranscriptions] = useState<{role: 'user' | 'model', text: string}[]>([]);
  
  const audioCtxRef = useRef<{
    input: AudioContext;
    output: AudioContext;
  } | null>(null);
  
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.input.close();
      audioCtxRef.current.output.close();
      audioCtxRef.current = null;
    }
    setIsActive(false);
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioCtxRef.current = { input: inputAudioContext, output: outputAudioContext };

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'You are a helpful, witty, and friendly AI assistant. Keep responses conversational and concise.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log('Live session opened');
            setIsActive(true);
            setIsConnecting(false);
            
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscriptions(prev => {
                  const last = prev[prev.length - 1];
                  if (last?.role === 'user') {
                      return [...prev.slice(0, -1), { role: 'user', text: last.text + text }];
                  }
                  return [...prev, { role: 'user', text }];
              });
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
                setTranscriptions(prev => {
                    const last = prev[prev.length - 1];
                    if (last?.role === 'model') {
                        return [...prev.slice(0, -1), { role: 'model', text: last.text + text }];
                    }
                    return [...prev, { role: 'model', text }];
                });
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const outCtx = audioCtxRef.current?.output;
              if (!outCtx) return;

              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live Error:', e);
            stopSession();
          },
          onclose: () => {
            console.log('Live Closed');
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (error) {
      console.error('Failed to start live session:', error);
      setIsConnecting(false);
      alert('Microphone access or connection failed.');
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh] space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold gradient-text">Vocal Link</h2>
        <p className="text-gray-400 max-w-md">Engage in high-fidelity, low-latency conversations with Gemini in real-time.</p>
      </div>

      <div className="relative">
        {isActive && (
          <div className="absolute -inset-8 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
        )}
        
        <button
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 group border-4 ${
            isActive 
              ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]' 
              : 'bg-indigo-600 border-indigo-400 text-white shadow-xl hover:scale-105'
          } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isConnecting ? (
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isActive ? (
            <>
              <span className="text-5xl mb-2">⏹️</span>
              <span className="font-bold text-sm tracking-widest uppercase">Terminate</span>
            </>
          ) : (
            <>
              <span className="text-5xl mb-2">🎙️</span>
              <span className="font-bold text-sm tracking-widest uppercase">Connect</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full glass-panel rounded-2xl p-6 min-h-[200px] max-h-[400px] overflow-y-auto flex flex-col gap-4">
        {transcriptions.length === 0 ? (
          <p className="text-gray-600 text-center italic mt-12">Session log will appear here during active conversation...</p>
        ) : (
          transcriptions.map((t, i) => (
            <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                t.role === 'user' 
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30' 
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}>
                <span className="text-[10px] font-bold block mb-1 opacity-50 uppercase tracking-tighter">
                  {t.role === 'user' ? 'You' : 'Assistant'}
                </span>
                {t.text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveAssistant;
