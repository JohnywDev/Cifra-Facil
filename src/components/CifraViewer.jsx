import React, { useState, useEffect } from 'react';
import { transporLinha } from '../data/musicas.js';

export default function CifraViewer({ musica }) {
  const [tomOffset, setTomOffset] = useState(0);
  const [rolando, setRolando] = useState(false);
  const [velocidade, setVelocidade] = useState(30);

  useEffect(() => {
    setTomOffset(0);
    setRolando(false);
  }, [musica]);

  useEffect(() => {
    let ultimoTempo = 0;
    let acumulador = 0;
    let animacaoId;

    const rolarTela = (tempoAtual) => {
      if (!ultimoTempo) ultimoTempo = tempoAtual;
      const delta = (tempoAtual - ultimoTempo) / 1000;
      ultimoTempo = tempoAtual;

      if (rolando) {
        acumulador += velocidade * delta;
        if (acumulador >= 1) {
          const pixelsParaRolar = Math.floor(acumulador);
          window.scrollBy(0, pixelsParaRolar);
          acumulador -= pixelsParaRolar;
        }
      }
      animacaoId = requestAnimationFrame(rolarTela);
    };

    if (rolando) {
      animacaoId = requestAnimationFrame(rolarTela);
    }

    return () => cancelAnimationFrame(animacaoId);
  }, [rolando, velocidade]);

  if (!musica) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center text-slate-500 text-center p-4">
        <span className="text-6xl mb-4">🎸</span>
        <h2 className="text-xl font-semibold text-slate-400 html-light:text-slate-600">Nenhuma música selecionada</h2>
        <p className="text-sm text-slate-500 mt-1">Escolha um gênero e clique em uma música no menu lateral para tocar.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 html-light:bg-white border border-slate-800 html-light:border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8 transition-colors duration-300">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 html-light:border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white html-light:text-slate-900 tracking-tight">{musica.titulo}</h1>
          <div className="flex gap-4 mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400 html-light:text-slate-500">
            <span>Tom Original: <strong className="text-emerald-400 capitalize">{musica.tomOriginal}</strong></span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950 html-light:bg-slate-100 p-2.5 rounded-xl border border-slate-800 html-light:border-slate-200 w-full sm:w-auto">
          <div className="flex items-center gap-2 border-r border-slate-800 html-light:border-slate-300 pr-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tom</span>
            <button 
              onClick={() => setTomOffset(prev => prev - 1)} 
              className="w-7 h-7 flex items-center justify-center bg-slate-800 html-light:bg-slate-200 hover:bg-slate-700 html-light:hover:bg-slate-300 text-white html-light:text-slate-800 font-bold rounded-lg transition"
            >
              -
            </button>
            <span className="font-mono text-sm font-bold text-emerald-500 w-8 text-center">
              {tomOffset >= 0 ? `+${tomOffset}` : tomOffset}
            </span>
            <button 
              onClick={() => setTomOffset(prev => prev + 1)} 
              className="w-7 h-7 flex items-center justify-center bg-slate-800 html-light:bg-slate-200 hover:bg-slate-700 html-light:hover:bg-slate-300 text-white html-light:text-slate-800 font-bold rounded-lg transition"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3 flex-1 sm:flex-none">
            <button
              onClick={() => setRolando(!rolando)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition active:scale-95 ${
                rolando 
                  ? 'bg-red-500 text-white' 
                  : 'bg-emerald-500 text-slate-950 font-bold'
              }`}
            >
              {rolando ? 'Parar' : 'Auto Rolar'}
            </button>
            
            {rolando && (
              <input 
                type="range" min="10" max="100" value={velocidade} 
                onChange={(e) => setVelocidade(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 html-light:bg-slate-300 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bloco da Cifra */}
      <div className="bg-slate-950/40 html-light:bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-800/60 html-light:border-slate-200 overflow-x-auto">
        <pre className="font-mono text-base md:text-lg leading-relaxed whitespace-pre">
          {musica.letraCifra.map((linha, index) => {
            if (linha.tipo === 'acorde') {
              return (
                <div key={index} className="text-emerald-500 font-bold tracking-wide select-none min-h-[1.5rem] mt-3">
                  {transporLinha(linha.texto, tomOffset)}
                </div>
              );
            }
            return (
              <div key={index} className="text-slate-300 html-light:text-slate-700 min-h-[1.5rem]">
                {linha.texto}
              </div>
            );
          })}
        </pre>
      </div>

    </div>
  );
}