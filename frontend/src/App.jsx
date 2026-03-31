import { useEffect, useState } from 'react'

// O nosso "Tanque de Guerra" dos logos continua intacto!
function LogoEmpresa({ nome, icone }) {
  const [tentativa, setTentativa] = useState(1);
  const dominio = `${nome.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  if (tentativa === 1) {
    return (
      <img
        src={`https://logo.clearbit.com/${dominio}`}
        alt={nome}
        className="w-10 h-10 object-contain"
        onError={() => setTentativa(2)} 
      />
    );
  }

  if (tentativa === 2) {
    return (
      <img
        src={`https://icons.duckduckgo.com/ip3/${dominio}.ico`}
        alt={nome}
        className="w-10 h-10 object-contain"
        onError={() => setTentativa(3)} 
      />
    );
  }

  return <span className="text-2xl font-bold text-primary">{icone}</span>;
}


function App() {
  const [empresas, setEmpresas] = useState([])
  
  // 1. CRIAMOS UM ESTADO PARA GUARDAR O TEXTO DA BUSCA
  const [busca, setBusca] = useState("")

  useEffect(() => {
    fetch('https://backend-layoff.onrender.com/api/layoffs')
      .then(resposta => resposta.json())
      .then(dados => setEmpresas(dados))
  }, [])

  // 2. CRIAMOS A LISTA FILTRADA
  // Ele olha para o nome da empresa e para o que você digitou. 
  // O "toLowerCase()" serve para ignorar se você digitou com letra maiúscula ou minúscula.
  const empresasFiltradas = empresas.filter((empresa) => 
    empresa.name.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="bg-surface text-on-surface min-h-screen font-inter">
      <header className="fixed top-0 w-full z-50 bg-[#faf9f6]/85 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 py-3 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6 flex-1">
            
            <div className="flex items-center gap-2">
              <img src="/logo.jpg" alt="Logo LayoffIn" className="w-8 h-8 rounded-md" />
              <span className="text-xl font-bold font-manrope">LayoffIn</span>
            </div>

            <div className="relative w-full max-w-md hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-sm">search</span>
              
              {/* 3. LIGAMOS O INPUT AO NOSSO ESTADO */}
              <input 
                className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm outline-none" 
                placeholder="Pesquisar empresa..." 
                type="text" 
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
              />
              
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-screen-xl mx-auto">
        <section className="mb-12">
          <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3 block">DanielPH Dev</span>
          <h1 className="text-5xl font-manrope font-extrabold text-on-surface tracking-tight">Painel de <span className="text-primary">Layoff</span></h1>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
            
            {/* 4. TROCAMOS "empresas.map" POR "empresasFiltradas.map" */}
            {/* Agora o React só desenha na tela quem passou no filtro! */}
            {empresasFiltradas.map((empresa) => (
              <article key={empresa.id} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 shadow-sm flex flex-col items-center text-center">
                
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-5 overflow-hidden border border-outline-variant/10">
                  <LogoEmpresa nome={empresa.name} icone={empresa.icon} />
                </div>

                <h4 className="font-manrope font-bold text-lg mb-1">{empresa.name}</h4>
                <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase mb-6">{empresa.sector}</span>
                <div className="mt-auto pt-4 w-full border-t border-outline-variant/5">
                  <p className="text-[11px] font-bold text-secondary uppercase mb-1">Total de demissões</p>
                  <p className="text-2xl font-manrope font-extrabold text-primary">{empresa.layoffs}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-1">Data: {empresa.date}</p>
                </div>
              </article>
            ))}

            {/* BÔNUS: Mensagem caso a busca não encontre nada */}
            {empresasFiltradas.length === 0 && (
              <div className="col-span-full text-center py-10 text-on-surface-variant">
                Nenhuma empresa encontrada com o nome "{busca}".
              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  )
}

export default App