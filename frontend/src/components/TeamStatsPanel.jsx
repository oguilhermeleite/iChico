import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TeamStatsPanel({ teamName, season = '2024' }) {
  // Dados mock - será substituído por dados reais do Felipe
  const [teamData] = useState({
    name: teamName,
    season,
    wins: 12,
    draws: 4,
    losses: 6,
    goalsFor: 34,
    goalsAgainst: 22,
    goalDiff: 12,
    form: [0, 1, 1, 0, 1, 1, 0], // 1=vitória, 0=não vitória
    recentMatches: [
      { date: '2024-07-02', opponent: 'Flamengo', result: 'V', score: '2-1' },
      { date: '2024-06-29', opponent: 'Santos', result: 'E', score: '1-1' },
      { date: '2024-06-26', opponent: 'Corinthians', result: 'V', score: '3-0' },
      { date: '2024-06-23', opponent: 'São Paulo', result: 'D', score: '0-2' },
      { date: '2024-06-20', opponent: 'Atlético MG', result: 'V', score: '1-0' },
    ],
    statsOverTime: [
      { week: 'Sem 1', wins: 2, draws: 1, losses: 0 },
      { week: 'Sem 2', wins: 1, draws: 2, losses: 1 },
      { week: 'Sem 3', wins: 2, draws: 0, losses: 1 },
      { week: 'Sem 4', wins: 2, draws: 1, losses: 0 },
      { week: 'Sem 5', wins: 2, draws: 0, losses: 2 },
      { week: 'Sem 6', wins: 3, draws: 0, losses: 1 },
    ],
  })

  const winRate = ((teamData.wins / (teamData.wins + teamData.draws + teamData.losses)) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header - Stats Principais */}
      <div className="bg-secondary border border-chicoia-lime rounded-lg p-6">
        <h2 className="text-2xl font-bold text-chicoia-lime mb-4">{teamData.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary rounded p-4 text-center">
            <div className="text-3xl font-bold text-chicoia-lime">{teamData.wins}</div>
            <div className="text-xs text-gray-400">Vitórias</div>
          </div>
          <div className="bg-primary rounded p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{teamData.draws}</div>
            <div className="text-xs text-gray-400">Empates</div>
          </div>
          <div className="bg-primary rounded p-4 text-center">
            <div className="text-3xl font-bold text-red-400">{teamData.losses}</div>
            <div className="text-xs text-gray-400">Derrotas</div>
          </div>
          <div className="bg-primary rounded p-4 text-center">
            <div className="text-3xl font-bold text-chicoia-lime">{winRate}%</div>
            <div className="text-xs text-gray-400">Taxa Vitória</div>
          </div>
        </div>
      </div>

      {/* Saldo de Gols */}
      <div className="bg-secondary border border-chicoia-lime rounded-lg p-6">
        <h3 className="text-lg font-bold text-chicoia-lime mb-4">Gols</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">{teamData.goalsFor}</div>
            <div className="text-sm text-gray-400">Marcados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400">{teamData.goalsAgainst}</div>
            <div className="text-sm text-gray-400">Sofridos</div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${teamData.goalDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {teamData.goalDiff >= 0 ? '+' : ''}{teamData.goalDiff}
            </div>
            <div className="text-sm text-gray-400">Saldo</div>
          </div>
        </div>
      </div>

      {/* Forma Recente */}
      <div className="bg-secondary border border-chicoia-lime rounded-lg p-6">
        <h3 className="text-lg font-bold text-chicoia-lime mb-4">Últimos 7 Jogos</h3>
        <div className="flex gap-2">
          {teamData.form.map((result, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded flex items-center justify-center font-bold text-sm ${
                result === 1
                  ? 'bg-green-400/20 text-green-400 border border-green-400'
                  : 'bg-red-400/20 text-red-400 border border-red-400'
              }`}
            >
              {result === 1 ? 'V' : 'NV'}
            </div>
          ))}
        </div>
      </div>

      {/* Últimos Jogos */}
      <div className="bg-secondary border border-chicoia-lime rounded-lg p-6">
        <h3 className="text-lg font-bold text-chicoia-lime mb-4">Últimos 5 Jogos</h3>
        <div className="space-y-2">
          {teamData.recentMatches.map((match, i) => (
            <div key={i} className="flex items-center justify-between bg-primary rounded p-3">
              <div className="flex-1">
                <div className="text-sm text-gray-400">{match.date}</div>
                <div className="font-semibold text-white">{match.opponent}</div>
              </div>
              <div className={`text-lg font-bold px-3 rounded ${
                match.result === 'V'
                  ? 'bg-green-400/20 text-green-400'
                  : match.result === 'E'
                  ? 'bg-blue-400/20 text-blue-400'
                  : 'bg-red-400/20 text-red-400'
              }`}>
                {match.result}
              </div>
              <div className="text-lg font-semibold text-white ml-4">{match.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico - Evolução de Vitórias */}
      <div className="bg-secondary border border-chicoia-lime rounded-lg p-6">
        <h3 className="text-lg font-bold text-chicoia-lime mb-4">Evolução por Semana</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamData.statsOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="week" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{ backgroundColor: '#0a0b0d', border: '1px solid #B8FF00' }}
              cursor={{ fill: 'rgba(184, 255, 0, 0.1)' }}
            />
            <Bar dataKey="wins" fill="#22c55e" name="Vitórias" />
            <Bar dataKey="draws" fill="#3b82f6" name="Empates" />
            <Bar dataKey="losses" fill="#ef4444" name="Derrotas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
