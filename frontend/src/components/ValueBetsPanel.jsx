import { useMemo, useState } from 'react'
import { detectValueBets } from '../lib/valueBets'

function Bar({ pct, color = '#B8FF00' }) {
  return (
    <div className="w-full h-1.5 bg-primary rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
      />
    </div>
  )
}

function EVBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide bg-chicoia-lime text-black">
      +EV
    </span>
  )
}

function EVInfo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-4 h-4 rounded-full border border-gray-600 text-gray-500 text-[10px] flex items-center justify-center hover:border-chicoia-lime hover:text-chicoia-lime transition-colors"
        aria-label="O que e +EV"
      >
        i
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-72 bg-primary border border-chicoia-lime/30 rounded-lg p-4 text-xs text-gray-300 leading-relaxed shadow-lg">
          <p className="text-chicoia-lime font-semibold mb-2">O que e +EV</p>
          <p className="mb-2">
            E uma aposta em que a odd oferecida pela casa e maior do que deveria ser,
            dando vantagem matematica ao apostador no longo prazo.
          </p>
          <p className="mb-2">
            Exemplo: um time tem 60% de chance de vencer. A odd justa seria 1.67
            (1 dividido por 0.60). Se a casa esta pagando 2.00, essa e uma aposta +EV.
          </p>
          <p className="text-gray-500">
            O resultado de uma aposta isolada pode ser vitoria ou derrota, mas repetindo
            apostas +EV muitas vezes a expectativa matematica e positiva.
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * @param {object} props
 * @param {{ outcome:string, houseOdds:number[] }[]} props.outcomes
 * @param {string} props.matchLabel
 */
export default function ValueBetsPanel({ outcomes, matchLabel }) {
  const analysis = useMemo(() => detectValueBets(outcomes, { minEdge: 1.5 }), [outcomes])

  return (
    <div className="bg-secondary border border-chicoia-lime rounded-lg p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-[11px] tracking-widest text-gray-500 uppercase">Deteccao automatica</p>
            <h3 className="text-lg font-bold text-chicoia-lime">Value Bets</h3>
          </div>
          <EVInfo />
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-500 uppercase">Margem casas</p>
          <p className="text-sm font-semibold text-gray-300 tabular-nums">{analysis.overround}%</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-4">{matchLabel}</p>

      {analysis.valueBets.length === 0 ? (
        <div className="text-sm text-gray-500 py-8 text-center border border-dashed border-gray-700 rounded-lg">
          Nenhuma aposta +EV acima do limiar agora. O mercado esta eficiente para esta partida.
        </div>
      ) : (
        <ul className="space-y-3">
          {analysis.valueBets.map((vb) => (
            <li key={vb.outcome} className="bg-primary rounded-lg p-4 border border-chicoia-lime/10">
              <div className="flex items-start justify-between mb-3">
                <span className="font-semibold text-gray-100">{vb.outcome}</span>
                <div className="flex items-center gap-2">
                  <span className="text-chicoia-lime font-bold tabular-nums">+{vb.edge}%</span>
                  <EVBadge />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Odd justa</p>
                  <p className="text-sm font-semibold text-gray-300 tabular-nums">{vb.fairOdd}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Melhor odd</p>
                  <p className="text-sm font-semibold text-chicoia-lime tabular-nums">{vb.bestOdd}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Prob. justa</p>
                  <p className="text-sm font-semibold text-gray-300 tabular-nums">{vb.trueProb}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-gray-500 uppercase tracking-wide w-20">Confianca</span>
                <Bar pct={vb.confidence * 10} color={vb.confidence >= 7 ? '#B8FF00' : '#ffeb3b'} />
                <span className="text-xs text-gray-400 tabular-nums w-10 text-right">{vb.confidence}/10</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="text-[11px] text-gray-600 mt-4 leading-relaxed">
        Odd justa calculada removendo a margem das casas (metodo no-vig). Aposta +EV: a
        probabilidade real do evento e maior do que a probabilidade implicita na odd. Retorno
        esperado nao garante resultado; aposte com responsabilidade.
      </p>
    </div>
  )
}
