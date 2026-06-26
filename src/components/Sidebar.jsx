// src/components/Sidebar.jsx
import React from 'react';
import { generosData } from '../datas/musicas';

// O seu Sidebar precisa receber essas 4 props do componente pai (App.jsx)
export default function Sidebar({ 
  generoAtivo, 
  setGeneroAtivo, 
  musicaSelecionada, 
  setMusicaSelecionada 
}) {
  
  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-6">
      {/* Seu Logo / Título */}
      <div className="text-2xl font-black tracking-wider text-emerald-400 border-b border-slate-800 pb-4">
        🎵 MINHAS CIFRAS
      </div>

      {/* Lista de Gêneros que você pediu */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Gêneros</h3>
        <div className="flex flex-col gap-1">
          {Object.keys(generosData).map((genero) => (
            <button
              key={genero}
              // Quando clica, muda o gênero e limpa a música anterior
              onClick={() => { 
                setGeneroAtivo(genero); 
                setMusicaSelecionada(null); 
              }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                generoAtivo === genero 
                  ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-400 pl-3' 
                  : 'text-gray-400 hover:bg-slate-800'
              }`}
            >
              {genero}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Músicas filtradas pelo gênero ativo */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Músicas ({generoAtivo})
        </h3>
        <div className="flex flex-col gap-1">
          {generosData[generoAtivo]?.map((musica) => (
            <button
              key={musica.id}
              // Quando clica, joga a música para o visualizador de cifras
              onClick={() => setMusicaSelecionada(musica)}
              className={`text-left px-4 py-3 rounded-lg text-sm transition ${
                musicaSelecionada?.id === musica.id 
                  ? 'bg-slate-800 text-white font-semibold' 
                  : 'text-gray-400 hover:bg-slate-800/50'
              }`}
            >
              {musica.titulo}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}