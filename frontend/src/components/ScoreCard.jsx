import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ScoreCard({ match, timeRange }) {
 const [score, setScore] = useState(0)
 const [trend, setTrend] = useState('+5.2%')
 const [chartData, setChartData] = useState([])

 useEffect(() => {
    // Simular dados do gráfico baseado no time range
 const generateChartData = () => {
 const points = timeRange === '6h' ? 12 : timeRange === '24h' ? 24 : 30
 const data = []
 const startScore = 55 + Math.random() * 30
      
 for (let i = 0; i < points; i++) {
 data.push({
 time: `${i}h`,
 score: Math.max(0, Math.min(100, startScore + (Math.sin(i / points * Math.PI) * 20) + (Math.random() - 0.5) * 8)),
        })
      }
 return data
    }

 const newData = generateChartData()
 setChartData(newData)
 // Pega o último score do gráfico
 if (newData.length > 0) {
      setScore(Math.round(newData[newData.length - 1].score))
    }
  }, [timeRange])

 const getScoreColor = (score) => {
 if (score >= 70) return 'text-green-400'
 if (score >= 40) return 'text-yellow-400'
 return 'text-red-400'
  }

 const getScoreDescription = (score) => {
 if (score >= 70) return 'Mercado otimista'
 if (score >= 40) return 'Mercado neutro'
 return 'Mercado pessimista'
  }

 return (
    <div className="bg-secondary border border-chicoia-lime rounded-lg p-8 space-y-6">{/* Header */}
      <div className="flex items-start justify-between"><div><h1 className="text-4xl font-bold text-chicoia-lime mb-2">iChico Score
          </h1><p className="text-gray-400">{match.team1} vs {match.team2} • {match.time}
          </p></div><div className={`text-6xl font-bold ${getScoreColor(score)}`}>{Math.round(score)}
        </div></div>{/* Description */}
      <div className="bg-primary rounded-lg p-4 border border-chicoia-lime/20"><p className="text-sm text-gray-300">{getScoreDescription(score)} - O mercado está {score > 70 ? 'aumentando' : score > 40 ? 'mantendo' : 'diminuindo'} a confiança em {match.team1}. 
 Variação de {trend} nas últimas {timeRange === '6h' ? '6 horas' : timeRange === '24h' ? '24 horas' : '7 dias'}.
        </p></div>{/* Trend */}
      <div className="grid grid-cols-3 gap-4"><div className="text-center"><p className="text-gray-400 text-sm mb-1">Variação</p><p className="text-2xl font-bold text-green-400">{trend}</p></div><div className="text-center"><p className="text-gray-400 text-sm mb-1">Vol. Apostas</p><p className="text-2xl font-bold text-chicoia-blue">R$ 2.3M</p></div><div className="text-center"><p className="text-gray-400 text-sm mb-1">Confiança</p><p className="text-2xl font-bold text-chicoia-lime">8.7/10</p></div></div>{/* Chart */}
      {chartData.length > 0 && (
        <div className="h-64 -mx-4 px-4"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#333" /><XAxis dataKey="time" stroke="#666" /><YAxis stroke="#666" domain={[0, 100]} /><Tooltip 
 contentStyle={{ 
 backgroundColor: '#1a1a1a', 
 border: '1px solid #B8FF00',
 borderRadius: '8px'
                }}
 formatter={(value) => `${Math.round(value)}`}
              /><Line 
 type="monotone" 
 dataKey="score" 
 stroke="#B8FF00" 
 dot={false}
 strokeWidth={3}
 isAnimationActive={true}
              /></LineChart></ResponsiveContainer></div>)}
    </div>)
}
