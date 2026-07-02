export default function Navigation({ activeTab, setActiveTab }) {
 return (
    <nav className="bg-chicoia-lime sticky top-16 z-40"><div className="max-w-7xl mx-auto px-4"><div className="flex gap-8"><button
 onClick={() => setActiveTab('inicio')}
 className={`py-4 font-semibold border-b-2 transition-all ${
 activeTab === 'inicio'
                ? 'border-black text-black'
                : 'border-transparent text-black/70 hover:text-black'
            }`}
          >Início
          </button><button
 onClick={() => setActiveTab('ichico')}
 className={`py-4 font-semibold border-b-2 transition-all flex items-center gap-2 ${
 activeTab === 'ichico'
                ? 'border-black text-black'
                : 'border-transparent text-black/70 hover:text-black'
            }`}
          >iChico
          </button><button
 onClick={() => setActiveTab('apostas')}
 className={`py-4 font-semibold border-b-2 transition-all ${
 activeTab === 'apostas'
                ? 'border-black text-black'
                : 'border-transparent text-black/70 hover:text-black'
            }`}
          >Apostas
          </button><button
 onClick={() => setActiveTab('chicogpt')}
 className={`py-4 font-semibold border-b-2 transition-all ${
 activeTab === 'chicogpt'
                ? 'border-black text-black'
                : 'border-transparent text-black/70 hover:text-black'
            }`}
          >ChicoGPT
          </button></div></div></nav>)
}
