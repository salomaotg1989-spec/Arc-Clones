
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, setCart }) => {
  const [method, setMethod] = useState<'PIX' | 'CARD' | null>(null);
  const [generating, setGenerating] = useState(false);
  const [link, setLink] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generatePayment = () => {
    setGenerating(true);
    setTimeout(() => {
      setLink(`https://arc-clones-payment.secure/auth/${Math.random().toString(36).substring(7)}`);
      setGenerating(false);
    }, 1500);
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto h-[60vh] flex flex-col items-center justify-center space-y-4 border border-dashed border-white/20 rounded-lg">
        <span className="text-4xl">🛒</span>
        <p className="text-gray-500 uppercase tracking-widest text-xs">O carrinho está vazio em seu terminal.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold uppercase italic tracking-tighter">Finalizar Pedido</h2>
      </header>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex gap-6 border border-white/10 p-4 items-center group">
              <img src={item.image} className="w-20 h-20 object-cover grayscale group-hover:grayscale-0 transition-all" />
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.category}</p>
                <p className="font-bold text-sm uppercase">{item.name}</p>
                <p className="text-xs text-gray-400 mt-1">QTD: {item.quantity} x R$ {item.price.toLocaleString('pt-BR')}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:underline">REMOVER</button>
            </div>
          ))}
          
          <div className="p-6 border border-white bg-white/5 space-y-4">
             <p className="text-xs uppercase tracking-widest font-bold">Resumo da Operação:</p>
             <div className="flex justify-between text-2xl font-bold">
               <span>TOTAL:</span>
               <span>R$ {total.toLocaleString('pt-BR')}</span>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-white p-6 space-y-4">
            <p className="text-[10px] font-bold tracking-widest uppercase">Selecionar Protocolo de Pagamento:</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setMethod('PIX')}
                className={`w-full py-3 text-xs font-bold uppercase tracking-widest border transition-all ${method === 'PIX' ? 'bg-white text-black' : 'border-white/20 hover:border-white'}`}
              >
                [PIX_INSTANTANEO]
              </button>
              <button 
                onClick={() => setMethod('CARD')}
                className={`w-full py-3 text-xs font-bold uppercase tracking-widest border transition-all ${method === 'CARD' ? 'bg-white text-black' : 'border-white/20 hover:border-white'}`}
              >
                [CREDITO_CRIPTOGRAFADO]
              </button>
            </div>

            {method && !link && (
              <button 
                onClick={generatePayment}
                disabled={generating}
                className="w-full bg-white text-black font-bold py-4 text-xs uppercase tracking-[0.2em] mt-4 hover:bg-gray-200 transition-all animate-pulse"
              >
                {generating ? 'GERANDO_LINK...' : 'EXECUTAR_PAGAMENTO'}
              </button>
            )}

            {link && (
              <div className="p-4 border border-white bg-black space-y-3 animate-in zoom-in-95">
                <p className="text-[8px] text-gray-400">LINK_DE_PAGAMENTO_SEGURO:</p>
                <input 
                  readOnly 
                  value={link} 
                  className="w-full bg-black border border-white/20 p-2 text-[10px] text-white focus:outline-none"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                    alert('Link copiado para a área de transferência.');
                  }}
                  className="w-full text-[10px] border border-white hover:bg-white hover:text-black py-2 uppercase font-bold tracking-widest"
                >
                  COPIAR_LINK
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
