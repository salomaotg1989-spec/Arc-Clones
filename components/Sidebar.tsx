
import React from 'react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  cartCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool, cartCount }) => {
  const navItems = [
    { id: ToolType.CATALOG, label: '[CATALOGO]', icon: '☠️' },
    { id: ToolType.CONSULTANT, label: '[ENGINE_IA]', icon: '⚙️' },
    { id: ToolType.CHECKOUT, label: `[CARRINHO](${cartCount})`, icon: '🛒' },
    { id: ToolType.ABOUT, label: '[HISTORIA]', icon: '📜' },
  ];

  return (
    <div className="w-20 md:w-64 hacker-bg border-r border-white/20 flex flex-col h-screen fixed left-0 top-0 z-20 transition-all duration-300">
      <div className="p-8 flex flex-col items-center md:items-start gap-6">
        <div className="text-7xl mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">🏴‍☠️</div>
        <span className="hidden md:block font-bold text-xl tracking-tighter text-white leading-none">
          ARC_CLONES<br/>
          <span className="text-[11px] text-gray-500 font-light mt-2 block tracking-widest uppercase">ROOT_ACCESS_GRANTED</span>
        </span>
      </div>
      
      <nav className="flex-1 px-4 mt-8 space-y-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTool(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 border transition-all duration-150 ${
              activeTool === item.id 
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                : 'bg-transparent text-white border-white/10 hover:border-white'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="hidden md:block font-bold text-sm uppercase tracking-[0.15em]">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10">
        <div className="hidden md:block p-4 border border-white/20 bg-white/5">
          <p className="text-[9px] text-gray-400 mb-2 uppercase tracking-widest">NETWORK_STATUS:</p>
          <p className="text-xs text-white flex items-center gap-3 font-bold">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            ENCRYPTED_LINK
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
