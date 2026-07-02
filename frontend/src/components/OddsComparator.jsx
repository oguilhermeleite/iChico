export default function OddsComparator({ match }) {
 const oddsData = [
    {
 house: 'Bet365',
 logo: '365',
 team1: 1.92,
 draw: 3.40,
 team2: 4.20,
 best: 'team1'
    },
    {
 house: 'Betano',
 logo: '',
 team1: 2.05,
 draw: 3.35,
 team2: 3.98,
 best: 'team1'
    },
    {
 house: 'Estrela Bet',
 logo: '',
 team1: 1.88,
 draw: 3.50,
 team2: 4.35,
 best: 'draw'
    },
    {
 house: 'Melbet',
 logo: '',
 team1: 2.10,
 draw: 3.25,
 team2: 3.95,
 best: 'team1'
    },
  ]

 return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-6"><div className="flex items-center gap-3 mb-6"><div className="text-2xl"></div><h3 className="text-lg font-bold text-chicoia-lime">Comparador de Odds</h3></div><p className="text-gray-400 text-sm mb-6">Melhores odds disponíveis no mercado</p>{/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-chicoia-lime/20"><th className="text-left py-3 px-3 text-gray-400 font-semibold">Casa</th><th className="text-center py-3 px-3 text-gray-400 font-semibold">{match.team1}
              </th><th className="text-center py-3 px-3 text-gray-400 font-semibold">Empate</th><th className="text-center py-3 px-3 text-gray-400 font-semibold">{match.team2}
              </th></tr></thead><tbody>{oddsData.map((odds, idx) => (
              <tr key={idx} className="border-b border-chicoia-lime/10 hover:bg-primary/50 transition-all"><td className="py-3 px-3 font-medium">{odds.house}</td><td className={`text-center py-3 px-3 font-semibold ${odds.best === 'team1' ? 'text-chicoia-lime bg-chicoia-lime/10' : ''}`}>{odds.team1}
                </td><td className={`text-center py-3 px-3 font-semibold ${odds.best === 'draw' ? 'text-chicoia-lime bg-chicoia-lime/10' : ''}`}>{odds.draw}
                </td><td className={`text-center py-3 px-3 font-semibold ${odds.best === 'team2' ? 'text-chicoia-lime bg-chicoia-lime/10' : ''}`}>{odds.team2}
                </td></tr>))}
          </tbody></table></div>{/* Mobile Cards */}
      <div className="lg:hidden space-y-3">{oddsData.map((odds, idx) => (
          <div key={idx} className="bg-primary rounded-lg p-4 border border-chicoia-lime/10"><p className="font-semibold mb-3">{odds.house}</p><div className="grid grid-cols-3 gap-2 text-center text-sm"><div className={`p-2 rounded ${odds.best === 'team1' ? 'bg-chicoia-lime/20 text-chicoia-lime' : ''}`}><p className="text-gray-400">{match.team1}</p><p className="font-bold">{odds.team1}</p></div><div className={`p-2 rounded ${odds.best === 'draw' ? 'bg-chicoia-lime/20 text-chicoia-lime' : ''}`}><p className="text-gray-400">Emp</p><p className="font-bold">{odds.draw}</p></div><div className={`p-2 rounded ${odds.best === 'team2' ? 'bg-chicoia-lime/20 text-chicoia-lime' : ''}`}><p className="text-gray-400">{match.team2}</p><p className="font-bold">{odds.team2}</p></div></div></div>))}
      </div>{/* Best Odds Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4"><div className="bg-primary rounded-lg p-4 border border-chicoia-lime border-green-500/50"><p className="text-xs text-gray-400 mb-1">Melhor {match.team1}</p><p className="text-2xl font-bold text-chicoia-lime">2.10</p><p className="text-xs text-gray-500 mt-1">Melbet</p></div><div className="bg-primary rounded-lg p-4 border border-chicoia-lime/20"><p className="text-xs text-gray-400 mb-1">Melhor Empate</p><p className="text-2xl font-bold text-chicoia-blue">3.50</p><p className="text-xs text-gray-500 mt-1">Estrela Bet</p></div><div className="bg-primary rounded-lg p-4 border border-chicoia-lime/20"><p className="text-xs text-gray-400 mb-1">Melhor {match.team2}</p><p className="text-2xl font-bold">4.35</p><p className="text-xs text-gray-500 mt-1">Estrela Bet</p></div></div></div>)
}
