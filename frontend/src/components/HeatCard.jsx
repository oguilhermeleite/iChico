export default function HeatCard({ matches }) {
 const heatMatches = matches.slice(0, 5).map((m, idx) => ({
    ...m,
 heat: 95 - (idx * 10),
  }))

 return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-6"><div className="flex items-center gap-3 mb-6"><div className="text-2xl"></div><h3 className="text-lg font-bold text-chicoia-lime">iChico Heat</h3></div><p className="text-gray-400 text-sm mb-6">Eventos mais apostados agora</p><div className="space-y-3">{heatMatches.map((match, idx) => (
          <div key={idx} className="bg-primary rounded-lg p-3 hover:bg-primary/80 cursor-pointer transition-all border border-chicoia-lime/10 hover:border-chicoia-lime/30"><div className="flex justify-between items-center mb-2"><span className="font-medium text-sm">{match.team1} vs {match.team2}
              </span><div className="flex items-center gap-2"><span className="text-chicoia-yellow font-bold">{match.heat}</span><div className="w-8 h-1 bg-primary rounded-full overflow-hidden"><div
 className="bg-gradient-to-r from-chicoia-yellow to-red-500 h-full"
 style={{ width: `${match.heat}%` }}
                  /></div></div></div><p className="text-xs text-gray-500">{match.time} • Vol: R$ {(match.heat * 0.1).toFixed(1)}M</p></div>))}
      </div></div>)
}
