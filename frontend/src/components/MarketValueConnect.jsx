import { useMemo } from 'react'
import { detectValueBets } from '../lib/valueBets'

/**
 * Conecta o iChico Market (para onde o dinheiro esta indo) com o Value Bets
 * (onde esta o +EV), numa unica leitura. O objetivo e responder a pergunta
 * que realmente importa para o usuario: onde apostar para ganhar mais dinheiro.
 *
 * @param {object} props
 * @param {{ outcome:string, houseOdds:number[] }[]} props.outcomes
 * @param {string} props.matchLabel
 */
export default function MarketValueConnect({ outcomes, matchLabel }) {
  const analysis = useMemo(() => detectValueBets(outcomes, { minEdge: 1.5 }), [outcomes])

  // "para onde o dinheiro esta indo" = maior probabilidade implicita (mercado)
  const crowdFavorite = [...analysis.outcomes].sort((a, b) => b.trueProb - a.trueProb)[0]
  const bestValue = analysis.valueBets[0]

  const insight = bestValue
    ? bestValue.outcome === crowdFavorite.outcome
      ? `A maior parte do dinheiro esta em "${crowdFavorite.outcome}" e o valor tambem esta ai: +${bestValue.edge}% de retorno esperado. Mercado e oportunidade apontam para o mesmo lado.`
      : `A maior parte do dinheiro esta em "${crowdFavorite.outcome}" (${crowdFavorite.trueProb}%), mas o +EV esta em "${bestValue.outcome}": +${bestValue.edge}% de retorno esperado. O mercado ainda nao precificou esse resultado corretamente.`
    : `A maior parte do dinheiro esta em "${crowdFavorite.outcome}" (${crowdFavorite.trueProb}%). Nenhuma oportunidade +EV acima do limiar agora — vale esperar o mercado se mover antes de apostar.`

  return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-5">
      <div className="mb-4">
        <p className="text-[11px] tracking-widest text-gray-500 uppercase">Dinheiro x valor</p>
        <h3 className="text-lg font-bold text-chicoia-lime">Onde apostar para ganhar mais</h3>
        <p className="text-xs text-gray-500 mt-1">{matchLabel}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {analysis.outcomes.map((o) => {
          const isBestValue = bestValue?.outcome === o.outcome
          const isCrowd = crowdFavorite.outcome === o.outcome
          return (
            <div
              key={o.outcome}
              className={`bg-primary rounded-lg p-3 border ${
                isBestValue ? 'border-chicoia-lime' : 'border-chicoia-lime/10'
              }`}
            >
              <p className="text-xs font-medium text-gray-200 mb-2">{o.outcome}</p>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-gray-500">Dinheiro do mercado</span>
                <span className="text-gray-300 font-semibold tabular-nums">
                  {o.trueProb}% {isCrowd && <span className="text-chicoia-blue">(favorito)</span>}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-500">Valor (+EV)</span>
                <span
                  className={`font-semibold tabular-nums ${
                    o.isValue ? 'text-chicoia-lime' : 'text-gray-600'
                  }`}
                >
                  {o.isValue ? `+${o.edge}%` : '—'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-primary rounded-lg p-3 border border-chicoia-lime/10">
        <p className="text-xs text-gray-300 leading-relaxed">{insight}</p>
      </div>
    </div>
  )
}
