import { useEffect, useState } from 'react'

export default function InsightCard({ match }) {
 const [insight, setInsight] = useState('')
 const [loading, setLoading] = useState(false)

 const insights = [
    `O mercado está aumentando a confiança na vitória do ${match.team1}. Nas últimas 6 horas as odds caíram em 8% na média das principais casas.`,
    `Detectamos forte entrada de Smart Money em ${match.team1}. A mudança é significativa e pode indicar confiança de apostadores profissionais.`,
    `Consenso das casas aponta para ${match.team1} com 52% de probabilidade. Melhor odd encontrada em Bet365 (2.15).`,
    `Análise técnica: O mercado está em alta confiança. Volume de apostas 23% acima da média dos últimos 7 dias para esse time.`,
  ]

 useEffect(() => {
 setLoading(true)
    // Simular delay de IA
 const timeout = setTimeout(() => {
 setInsight(insights[Math.floor(Math.random() * insights.length)])
 setLoading(false)
    }, 800)

 return () => clearTimeout(timeout)
  }, [match])

 return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-6"><div className="flex items-center gap-3 mb-6"><div className="text-2xl"></div><h3 className="text-lg font-bold text-chicoia-lime">iChico Insights</h3></div><p className="text-gray-400 text-sm mb-6">Análise de IA em linguagem natural</p><div className={`bg-primary rounded-lg p-4 border border-chicoia-lime/20 transition-all ${loading ? 'animate-pulse' : ''}`}>{loading ? (
          <div className="space-y-2"><div className="h-4 bg-chicoia-lime/20 rounded-full w-3/4"></div><div className="h-4 bg-chicoia-lime/20 rounded-full w-full"></div><div className="h-4 bg-chicoia-lime/20 rounded-full w-2/3"></div></div>) : (
          <p className="text-gray-100 leading-relaxed text-sm">{insight}
          </p>)}
      </div><div className="mt-4 p-3 bg-chicoia-lime/10 border border-chicoia-lime/20 rounded-lg"><p className="text-xs text-gray-400"><span className="text-chicoia-lime font-semibold">Dica:</span> Insights gerados por IA podem não ser garantia de resultado. Use como informação complementar.
        </p></div><div className="mt-4 flex gap-2"><button
 onClick={() => {
 setInsight('')
 setLoading(true)
 setTimeout(() => {
 setInsight(insights[Math.floor(Math.random() * insights.length)])
 setLoading(false)
            }, 800)
          }}
 className="flex-1 bg-chicoia-lime/10 border border-chicoia-lime text-chicoia-lime py-2 rounded font-medium text-sm hover:bg-chicoia-lime/20 transition-all"
        >Novo Insight
        </button></div></div>)
}
