import React, { useState, useEffect } from 'react';
import { generosData } from './data/musicas.js';
import CifraViewer from './components/CifraViewer.jsx';
import minhaPalheta from './assets/palheta.svg';

export default function App() {
  const listaGeneros = Object.keys(generosData);
  const [generoAtivo, setGeneroAtivo] = useState(listaGeneros[0]);
  const [musicaSelecionada, setMusicaSelecionada] = useState(null);
  
  // Estado do Tema (Começa no escuro/dark)
  const [temaClaro, setTemaClaro] = useState(false);

  // Efeito para injetar ou remover a classe 'light' na tag <html> do site
  useEffect(() => {
    const root = window.document.documentElement;
    if (temaClaro) {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [temaClaro]);

  return (
    <div className="flex min-h-screen font-sans antialiased bg-slate-950 html-light:bg-slate-50 text-slate-100 html-light:text-slate-900 transition-colors duration-300">
      
      {/* BOTÃO DE TEMA APENAS PARA COMPUTADOR (Escondido no Celular) */}
      <div className="fixed top-4 right-4 z-50 hidden md:block">
        <button
          onClick={() => setTemaClaro(!temaClaro)}
          className="p-3 rounded-full bg-slate-900 html-light:bg-white text-slate-100 html-light:text-slate-900 shadow-xl border border-slate-800 html-light:border-slate-200 active:scale-95 transition cursor-pointer font-bold text-lg"
          title={temaClaro ? "Ativar Modo Escuro" : "Ativar Modo Claro"}
        >
          {temaClaro ? "🌙" : "☀️"}
        </button>
      </div>

      {/* 1. SIDEBAR LATERAL (Desktop) */}
      <aside className="w-80 bg-slate-900 html-light:bg-slate-100 border-r border-slate-800/80 html-light:border-slate-200 p-5 flex flex-col gap-6 hidden md:flex sticky top-0 h-screen overflow-y-auto transition-colors duration-300">
        
        {/* Branding */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 html-light:border-slate-200">
          <img src={minhaPalheta} alt="Palheta" className="w-15 h-15 object-contain inline-block" />
          <h2 className="text-xl font-black tracking-tight text-white html-light:text-slate-900">
            CIFRAS FÁCIL
          </h2>
        </div>

        {/* Seção 1: Gêneros */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-3">
            Filtrar por Gênero
          </span>
          <nav className="flex flex-col gap-1">
            {listaGeneros.map((genero) => {
              const ativo = generoAtivo === genero;
              return (
                <button
                  key={genero}
                  onClick={() => {
                    setGeneroAtivo(genero);
                    setMusicaSelecionada(null);
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    ativo 
                      ? 'bg-emerald-500/10 text-emerald-500 font-semibold border-l-4 border-emerald-400 pl-3' 
                      : 'text-slate-400 html-light:text-slate-600 hover:bg-slate-800 html-light:hover:bg-slate-200'
                  }`}
                >
                  {genero}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Seção 2: Músicas */}
        <div className="flex-1 flex flex-col min-h-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-3">
            Músicas Disponíveis
          </span>
          <div className="flex flex-col gap-1 overflow-y-auto pr-1 flex-1">
            {generosData[generoAtivo]?.map((musica) => {
              const selecionada = musicaSelecionada?.id === musica.id;
              return (
                <button
                  key={musica.id}
                  onClick={() => setMusicaSelecionada(musica)}
                  className={`text-left px-4 py-3 rounded-xl text-xs font-medium border transition-all duration-200 ${
                    selecionada 
                      ? 'bg-slate-800 html-light:bg-slate-200 border-slate-700 html-light:border-slate-300 text-white html-light:text-slate-900 shadow-lg font-bold' 
                      : 'bg-transparent border-transparent text-slate-400 html-light:text-slate-600 hover:bg-slate-800/40 html-light:hover:bg-slate-200'
                  }`}
                >
                  🎵 {musica.titulo}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* NAVBAR MOBILE (Ajustada com o botão de tema integrado) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 html-light:bg-slate-100 border-b border-slate-800 html-light:border-slate-200 px-4 flex items-center justify-between z-40 transition-colors duration-300">
        <img src={minhaPalheta} alt="Palheta" className="w-15 h-15 object-contain inline-block" />
        <h2 className="font-black text-sm tracking-widest text-emerald-500"> CIFRAS FÁCIL</h2>
        
        {/* Lado Direito da barra mobile agrupa o seletor e o novo botão menor */}
        <div className="flex items-center gap-3">
          <select 
            value={generoAtivo} 
            onChange={(e) => { setGeneroAtivo(e.target.value); setMusicaSelecionada(null); }}
            className="bg-slate-950 html-light:bg-white border border-slate-800 html-light:border-slate-300 rounded-lg text-xs p-2 text-white html-light:text-slate-900 outline-none font-medium"
          >
            {listaGeneros.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <button
            onClick={() => setTemaClaro(!temaClaro)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-950 html-light:bg-white text-slate-100 html-light:text-slate-900 border border-slate-800 html-light:border-slate-300 active:scale-95 transition text-base"
          >
            {temaClaro ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* LISTA DE MÚSICAS MOBILE */}
      <div className="md:hidden fixed top-16 left-0 right-0 bg-slate-950 html-light:bg-slate-200 border-b border-slate-900 html-light:border-slate-300 p-2 flex gap-2 overflow-x-auto z-30 transition-colors duration-300">
        {generosData[generoAtivo]?.map((musica) => (
          <button
            key={musica.id}
            onClick={() => setMusicaSelecionada(musica)}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap border ${
              musicaSelecionada?.id === musica.id 
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' 
                : 'bg-slate-900 html-light:bg-white text-slate-400 html-light:text-slate-600 border-slate-800 html-light:border-slate-300'
            }`}
          >
            {musica.titulo}
          </button>
        ))}
      </div>

      {/* 2. CONTEÚDO DA CIFRA */}
      <main className="flex-1 p-4 md:p-10 pt-32 md:pt-10 overflow-y-auto">
        <CifraViewer musica={musicaSelecionada} />
      </main>

    </div>
  );
}