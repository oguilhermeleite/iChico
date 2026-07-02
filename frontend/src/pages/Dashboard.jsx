import { useState } from 'react'
import MarketCard from '../components/MarketCard'
import SmartMoneyCard from '../components/SmartMoneyCard'
import ConsensusCard from '../components/ConsensusCard'
import HeatCard from '../components/HeatCard'
import InsightCard from '../components/InsightCard'
import OddsComparator from '../components/OddsComparator'
import AlertsFeed from '../components/AlertsFeed'
import ValueBetsPanel from '../components/ValueBetsPanel'
import MarketValueConnect from '../components/MarketValueConnect'
import { mockData } from '../data/mockData'

// Odds por casa usadas na deteccao de value (em producao vem da API)
const ODDS_BY_MATCH = {
  '1': [
    { outcome: 'Vitoria Palmeiras', houseOdds: [1.90, 1.92, 1.88, 1.91] },
    { outcome: 'Empate', houseOdds: [3.40, 3.35, 3.50, 3.45] },
    { outcome: 'Vitoria Flamengo', houseOdds: [4.20, 3.98, 5.10, 4.05] },
  ],
  '2': [
    { outcome: 'Vitoria Sao Paulo', houseOdds: [2.15, 2.20, 2.08, 2.25] },
    { outcome: 'Empate', houseOdds: [3.20, 3.15, 3.30, 3.10] },
    { outcome: 'Vitoria Corinthians', houseOdds: [3.60, 3.50, 3.70, 3.45] },
  ],
}

export default function Dashboard() {
  const [selectedMatch, setSelectedMatch] = useState(mockData.matches[0])
  const [timeRange, setTimeRange] = useState('24h')

  const outcomes = ODDS_BY_MATCH[selectedMatch.id] || ODDS_BY_MATCH['1']
  const matchLabel = `${selectedMatch.team1} vs ${selectedMatch.team2}`

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex gap-4 flex-wrap items-center">
        <div className="flex gap-2">
          {['6h', '24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded border transition-all ${
                timeRange === range
                  ? 'bg-chicoia-lime text-black border-chicoia-lime'
                  : 'border-chicoia-lime/30 text-chicoia-lime hover:border-chicoia-lime'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        <select
          value={selectedMatch.id}
          onChange={(e) => {
            const match = mockData.matches.find((m) => m.id === e.target.value)
            setSelectedMatch(match)
          }}
          className="px-4 py-2 bg-secondary border border-chicoia-lime/30 text-white rounded focus:outline-none focus:border-chicoia-lime"
        >
          {mockData.matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.team1} vs {match.team2}
            </option>
          ))}
        </select>
      </div>

      {/* Dinheiro x Valor: conecta Market e Value Bets numa unica leitura */}
      <MarketValueConnect outcomes={outcomes} matchLabel={matchLabel} />

      {/* Value Bets (automatico) + Alertas (tempo real) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ValueBetsPanel outcomes={outcomes} matchLabel={matchLabel} />
        <AlertsFeed />
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MarketCard match={selectedMatch} />
        <SmartMoneyCard match={selectedMatch} />
        <ConsensusCard match={selectedMatch} />
      </div>

      {/* Heat e Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeatCard matches={mockData.matches} />
        <InsightCard match={selectedMatch} />
      </div>

      {/* Comparador de Odds */}
      <OddsComparator match={selectedMatch} />
    </div>
  )
}
