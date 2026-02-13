
import React from 'react';
import { WatchModel } from '../types';

const WATCHES: WatchModel[] = [
  { id: '1', name: 'ROLEX SUBMARINER PRO', price: 3890, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=800&auto=format&fit=crop', category: 'DIVER', fidelity: 99.8 },
  { id: '2', name: 'PATEK NAUTILUS GHOST', price: 4450, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', category: 'LUXURY', fidelity: 100 },
  { id: '3', name: 'AP ROYAL OAK CARBON', price: 4200, image: 'https://images.unsplash.com/photo-1548171915-e79a33c73ad4?q=80&w=800&auto=format&fit=crop', category: 'ICONIC', fidelity: 99.9 },
  { id: '4', name: 'OMEGA SPEEDMASTER NOIR', price: 3550, image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop', category: 'PILOT', fidelity: 99.7 },
];

interface CatalogProps {
  addToCart: (watch: WatchModel) => void;
}

const WatchCatalog: React.FC<CatalogProps> = ({ addToCart }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-500">
      <header className="border-l-4 border-white pl-8 space-y-2">
        <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Operação: Silêncio</h2>
        <p className="text-gray-500 text-xs tracking-widest uppercase">Clones de nível militar. Zero rastreamento.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
        {WATCHES.map((watch) => (
          <div key={watch.id} className="group border border-white/20 hover:border-white transition-all duration-300 bg-black flex flex-col">
            <div className="relative aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border-b border-white/10">
              <img src={watch.image} alt={watch.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold border border-white tracking-widest">
                #{watch.id.padStart(4, '0')}
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-gray-600 tracking-[0.3em] font-bold uppercase">{watch.category}</span>
                <h3 className="text-xl font-bold tracking-tight uppercase glitch-text cursor-pointer">{watch.name}</h3>
                <p className="text-2xl font-light">R$ {watch.price.toLocaleString('pt-BR')}</p>
              </div>

              {/* Fidelity Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold tracking-widest uppercase text-gray-400">
                  <span>Fidelidade Estética</span>
                  <span>{watch.fidelity}%</span>
                </div>
                <div className="w-full h-1 bg-gray-900 overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-1000 ease-out" 
                    style={{ width: `${watch.fidelity}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => addToCart(watch)}
                  className="bg-white text-black font-bold py-3 text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  [BUY_NOW]
                </button>
                <a 
                   href={`https://wa.me/5500000000000?text=${encodeURIComponent(`Olá, tenho interesse no modelo ${watch.name} que vi no site Arc Clones.`)}`}
                   target="_blank"
                   className="border border-white/40 text-white font-bold py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black text-center transition-all"
                >
                  [WHATSAPP]
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchCatalog;
