
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-12 animate-in fade-in duration-1000">
      <div className="relative h-96 border border-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=1200&auto=format&fit=crop" 
          alt="Luxury Workshop" 
          className="w-full h-full object-cover grayscale opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-12">
            <h2 className="text-5xl font-bold uppercase italic tracking-tighter mb-4">Nossa Bandeira</h2>
            <p className="text-gray-300 max-w-xl font-light leading-relaxed italic border-l-2 border-white pl-6 uppercase text-xs tracking-widest">
              "Unindo a estética dos grandes ícones mundiais à acessibilidade, sem abrir mão da precisão mecânica."
            </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 px-4">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold uppercase italic tracking-tighter underline">CÓDIGO DE CONDUTA</h3>
          <p className="text-gray-400 leading-relaxed font-light text-sm uppercase">
            Arc Clones: Especialista em alta horologia e réplicas premium há mais de 15 anos. 
            Nossa missão é o bypass completo do mercado de luxo inflacionado. 
            Garantimos 99% de fidelidade através de engenharia reversa de alta precisão.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 border border-white/20 bg-white/5 text-center">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-2">ANOS_DE_REVERSA</p>
            </div>
            <div className="p-4 border border-white/20 bg-white/5 text-center">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-2">ANONIMATO_PEDIDO</p>
            </div>
          </div>
        </div>

        <div className="border border-white/20 p-8 flex flex-col justify-center space-y-6 bg-black">
            <p className="text-xs text-gray-200 font-light leading-relaxed uppercase tracking-wider">
               Estabelecemos nossa presença no underground da horologia em 2009. 
               Não somos apenas vendedores; somos entusiastas da mecânica fina que se recusam a aceitar os limites impostos pelas marcas tradicionais.
            </p>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-white flex items-center justify-center font-bold text-xl italic">AC</div>
                <div>
                    <p className="text-[10px] font-bold text-gray-100 uppercase tracking-widest">FUNDAÇÃO ARC CLONES</p>
                    <p className="text-[8px] text-gray-600">SINCE_2009_EST</p>
                </div>
            </div>
        </div>
      </div>
      
      <div className="text-center pb-20 space-y-8">
        <p className="text-[8px] text-gray-600 uppercase tracking-[0.8em]">TERMINAL_VALUES</p>
        <div className="flex flex-wrap justify-center gap-12">
            {['ZERO_TRACING', 'SWISS_CALIBER', 'NO_COMPROMISE', '99%_CLONE'].map(val => (
                <span key={val} className="text-white text-[10px] font-bold tracking-[0.3em] uppercase border-b border-white/20 pb-1">{val}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
