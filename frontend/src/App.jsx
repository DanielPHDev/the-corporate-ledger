import { useEffect, useState } from 'react'

function App() {
  // Aqui criamos uma "caixa" para guardar os dados que virão do Python
  const [empresas, setEmpresas] = useState([])

  // Quando a página carrega, ele vai lá no Python buscar os dados
  useEffect(() => {
    // Para testar no seu computador use a url abaixo. 
    // Quando fizermos o deploy, trocaremos essa URL pela url do Render.
    fetch('https://backend-layoff.onrender.com/api/layoffs')
      .then(resposta => resposta.json())
      .then(dados => setEmpresas(dados))
  }, [])

  return (
    <div className="bg-surface text-on-surface min-h-screen font-inter">
      {/* Cabeçalho */}
      <header className="fixed top-0 w-full z-50 bg-[#faf9f6]/85 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 py-3 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6 flex-1">
            <span className="text-xl font-bold font-manrope">LayoffIn</span>
            <div className="relative w-full max-w-md hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-sm">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm outline-none" placeholder="Pesquisar empresa..." type="text" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-screen-xl mx-auto">
        {/* Título */}
        <section className="mb-12">
          <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3 block">DanielPH Dev</span>
          <h1 className="text-5xl font-manrope font-extrabold text-on-surface tracking-tight">Painel de  <span className="text-primary">Layoff</span></h1>
        </section>

        {/* Grade de Empresas */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
            
            {/* Aqui o React repete o seu design de cartão para cada empresa do JSON! */}
            {empresas.map((empresa) => (
              <article key={empresa.id} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 shadow-sm flex flex-col items-center text-center">
                
                {/* MODIFICAMOS ESTA ÁREA: Tentar carregar o logo */}
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-5 text-2xl font-bold text-primary overflow-hidden border border-outline-variant/10">
                  <img
                    // Geramos o URL do logo dinamicamente: nome da empresa em minúsculo + .com
                    // (Ex: Atlassian vira atlassian.com)
                    src={`https://logo.clearbit.com/${empresa.name.toLowerCase().replace(/\s+/g, '')}.com`}
                    alt={`${empresa.name} Logo`}
                    className="w-10 h-10 object-contain"
                    
                    // Se o logo falhar (ex: site diferente de .com), fallback para inicial
                    onError={(e) => {
                      e.target.onerror = null; // evita loop infinito
                      e.target.style.display = 'none'; // esconde imagem quebrada
                      // Mostra a inicial 'icon' que veio do backend
                      e.target.parentNode.innerHTML = `<span class="text-2xl font-bold text-primary">${empresa.icon}</span>`;
                    }}
                  />
                </div>

                <h4 className="font-manrope font-bold text-lg mb-1">{empresa.name}</h4>
                <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase mb-6">{empresa.sector}</span>
                <div className="mt-auto pt-4 w-full border-t border-outline-variant/5">
                  <p className="text-[11px] font-bold text-secondary uppercase mb-1">Total de demissões</p>
                  <p className="text-2xl font-manrope font-extrabold text-primary">{empresa.layoffs}</p>
                </div>
              </article>
            ))}

          </div>
        </section>
      </main>
    </div>
  )
}

export default App