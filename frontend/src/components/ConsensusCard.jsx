export default function ConsensusCard({ match }) {
 const consensus = [
    { team: 'Vitória ' + match.team1, percentage: 52, oddAvg: 1.92, houses: ['Bet365', 'Betano', 'Estrela Bet', 'Melbet'] },
    { team: 'Empate', percentage: 28, oddAvg: 3.57, houses: ['Bet365', 'Betano', 'Rivalo'] },
    { team: 'Vitória ' + match.team2, percentage: 20, oddAvg: 4.15, houses: ['Bet365', 'Estrela Bet'] },
  ]

 return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-6 hover:border-chicoia-lime/50 transition-all"><div className="flex items-center gap-3 mb-6"><div className="text-2xl"></div><h3 className="text-lg font-bold text-chicoia-lime">iChico Consenso</h3></div><p className="text-gray-400 text-sm mb-6">Média de todas as casas</p><div className="space-y-4">{consensus.map((item, idx) => (
          <div key={idx} className="bg-primary rounded-lg p-3 border border-chicoia-lime/10"><div className="flex justify-between items-start mb-2"><span className="text-sm font-medium">{item.team}</span><span className="text-chicoia-lime font-bold">{item.percentage}%</span></div><div className="w-full bg-primary rounded-full h-2 mb-3 border border-chicoia-lime/10 overflow-hidden"><div
 className="bg-chicoia-lime h-full"
 style={{ width: `${item.percentage}%` }}
              /></div><div className="flex justify-between items-center mb-2"><span className="text-xs text-gray-500">Odd Média</span><span className="text-xs text-chicoia-blue font-semibold">{item.oddAvg}</span></div><div className="text-xs text-gray-500">{item.houses.length} casas: {item.houses.join(', ')}
            </div></div>))}
      </div></div>)
}
