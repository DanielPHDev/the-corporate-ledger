import { useEffect, useState } from 'react'

// 1. CRIAMOS UM MINI-COMPONENTE SÓ PARA O LOGO
function LogoEmpresa({ nome, icone }) {
  // O React agora "lembra" se a imagem deu erro
  const [deuErro, setDeuErro] = useState(false);

  // Limpamos o nome (tira espaços e pontuações) para tentar achar o site
  const dominio = `${nome.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  const urlLogo = `https://logo.clearbit.com/${dominio}`;

  // Se o Clearbit não achar o logo e der erro, mostramos a letra inicial
  if (deuErro) {
    return <span className="text-2xl font-bold text-primary">{icone}</span>;
  }

  // Se ainda não deu erro, tentamos mostrar a imagem
  return (
    <img
      src={urlLogo}
      alt={`Logo da ${nome}`}
      className="w-10 h-10 object-contain"
      onError={() => setDeuErro(true)} // Avisa o React que o link quebrou!
    />
  );
}


function App() {
  const [empresas, setEmpresas] = useState([])

  useEffect(() => {
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
            
            {/* Adicionando a logo do seu projeto de volta ao lado do nome! */}
            <div className="flex items-center gap-2">
              <img src="/logo.jpg" alt="Logo LayoffIn" className="w-8 h-8 rounded-md" />
              <span className="text-xl font-bold font-manrope">LayoffIn</span>
            </div>

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
          <h1 className="text-5xl font-manrope font-extrabold text-on-surface tracking-tight">Painel de <span className="text-primary">Layoff</span></h1>
        </section>

        {/* Grade de Empresas */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
            
            {empresas.map((empresa) => (
              <article key={empresa.id} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 shadow-sm flex flex-col items-center text-center">
                
                {/* 2. AQUI USAMOS O NOSSO NOVO MINI-COMPONENTE */}
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-5 overflow-hidden border border-outline-variant/10">
                  <LogoEmpresa nome={empresa.name} icone={empresa.icon} />
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