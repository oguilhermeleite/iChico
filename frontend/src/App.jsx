import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import Navigation from './components/Navigation'
import './App.css'

function App() {
 const [activeTab, setActiveTab] = useState('ichico')

 return (
    <div className="min-h-screen bg-primary">{/* Header */}
      <header className="bg-chicoia-lime text-black sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-2"><div className="text-2xl font-bold">C</div><span className="text-xl font-bold">iChico</span></div><div className="text-sm font-semibold">Índice de Apostas Esportivas</div></div></header>{/* Navigation Tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />{/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{activeTab === 'ichico' && <Dashboard />}
        {activeTab === 'outros' && (
          <div className="text-center text-gray-400 py-12">Outras abas virão em breve...
          </div>)}
      </main>{/* Footer */}
      <footer className="bg-secondary border-t border-chicoia-lime/20 mt-12 py-6"><div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">iChico © 2024 - Índice agregador de odds para apostas esportivas
        </div></footer></div>)
}

export default App
