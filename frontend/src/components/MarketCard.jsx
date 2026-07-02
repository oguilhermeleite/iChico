export default function MarketCard({ match }) {
 const marketData = [
    { direction: 'Vitória ' + match.team1, percentage: 52, volume: 'R$ 1.2M' },
    { direction: 'Empate', percentage: 28, volume: 'R$ 640k' },
    { direction: 'Vitória ' + match.team2, percentage: 20, volume: 'R$ 460k' },
  ]

 return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-6 hover:border-chicoia-lime/50 transition-all"><div className="flex items-center gap-3 mb-6"><div className="text-2xl"></div><h3 className="text-lg font-bold text-chicoia-lime">iChico Market</h3></div><p className="text-gray-400 text-sm mb-6">Para onde o dinheiro está indo</p><div className="space-y-4">{marketData.map((item, idx) => (
          <div key={idx} className="space-y-2"><div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">{item.direction}</span><span className="text-chicoia-lime font-bold">{item.percentage}%</span></div><div className="w-full bg-primary rounded-full h-2 overflow-hidden"><div
 className="bg-gradient-to-r from-chicoia-lime to-chicoia-blue h-full"
 style={{ width: `${item.percentage}%` }}
              /></div><span className="text-xs text-gray-500">{item.volume}</span></div>))}
      </div><div className="mt-6 p-3 bg-primary rounded border border-chicoia-lime/10"><p className="text-xs text-gray-400"><span className="text-chicoia-lime">+8.2%</span> mais apostas em {match.team1} nas últimas 3 horas
        </p></div></div>)
}
