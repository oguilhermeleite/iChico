export default function SmartMoneyCard({ match }) {
 const smartMoneyEvents = [
    {
 time: '14:32',
 event: 'Queda de 2.15 para 2.02',
 odds: 'Vitória ' + match.team1,
 alert: ' Alto volume detectado',
    },
    {
 time: '13:45',
 event: 'Aumento de 3.20 para 3.45',
 odds: 'Empate',
 alert: ' Saída de apostas',
    },
  ]

 return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-6 hover:border-chicoia-lime/50 transition-all"><div className="flex items-center gap-3 mb-6"><div className="text-2xl"></div><h3 className="text-lg font-bold text-chicoia-lime">iChico Smart Money</h3></div><p className="text-gray-400 text-sm mb-6">Movimentações anormais detectadas</p><div className="space-y-4">{smartMoneyEvents.map((event, idx) => (
          <div key={idx} className="bg-primary rounded-lg p-3 border border-chicoia-lime/10"><div className="flex justify-between items-start mb-2"><span className="text-xs text-chicoia-yellow font-semibold">{event.time}</span><span className="text-xs bg-chicoia-blue/20 text-chicoia-blue px-2 py-1 rounded">{event.odds}
              </span></div><p className="text-sm font-medium mb-2">{event.event}</p><p className="text-xs text-gray-400">{event.alert}</p></div>))}
      </div><div className="mt-4 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">Mudança brusca detectada: Smart Money entrando forte em {match.team1}
      </div></div>)
}
