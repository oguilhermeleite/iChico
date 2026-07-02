/**
 * iChico Alert Engine
 *
 * Observa a evolucao das odds e gera alertas quando detecta:
 *  - STEAM: queda rapida de odd (entrada de dinheiro / smart money)
 *  - DRIFT: alta de odd (saida de dinheiro)
 *  - VALUE: surgimento de aposta de valor acima do limiar
 *
 * Em producao, alimente `ingestSnapshot` com odds reais das casas.
 * Aqui incluimos um simulador para desenvolvimento e demonstracao.
 */

import { detectValueBets } from './valueBets.js'

const round = (n, d = 2) => Number(n.toFixed(d))

// Limiares configuraveis
const THRESHOLDS = {
  steamPct: 3, // queda >= 3% no periodo -> steam
  driftPct: 3, // alta >= 3% -> drift
  windowMs: 15 * 60 * 1000, // janela de 15 min
  minEdge: 2, // edge minimo para alerta de value
}

/** Historico em memoria por partida+resultado. Troque por Redis em producao. */
const history = new Map() // key: `${matchId}:${outcome}` -> [{ t, odd }]

function keyFor(matchId, outcome) {
  return `${matchId}:${outcome}`
}

/**
 * Ingesta um snapshot de odds e retorna a lista de alertas gerados.
 * @param {object} snapshot
 * @param {string} snapshot.matchId
 * @param {string} snapshot.matchLabel
 * @param {Array<{ outcome:string, houseOdds:number[] }>} snapshot.outcomes
 * @returns {Array<object>} alertas
 */
export function ingestSnapshot(snapshot) {
  const now = Date.now()
  const alerts = []

  for (const o of snapshot.outcomes) {
    const bestOdd = Math.max(...o.houseOdds)
    const k = keyFor(snapshot.matchId, o.outcome)
    const series = history.get(k) ?? []
    series.push({ t: now, odd: bestOdd })

    // mantem apenas a janela relevante
    const cutoff = now - THRESHOLDS.windowMs
    const windowed = series.filter((p) => p.t >= cutoff)
    history.set(k, windowed)

    if (windowed.length >= 2) {
      const first = windowed[0].odd
      const last = windowed[windowed.length - 1].odd
      const changePct = ((last - first) / first) * 100

      if (changePct <= -THRESHOLDS.steamPct) {
        alerts.push(
          buildAlert('STEAM', snapshot, o.outcome, {
            from: round(first),
            to: round(last),
            changePct: round(changePct, 1),
            message:
              `Queda rapida em "${o.outcome}": ${round(first)} para ${round(last)} ` +
              `(${round(changePct, 1)}%). Possivel entrada de smart money.`,
          }),
        )
      } else if (changePct >= THRESHOLDS.driftPct) {
        alerts.push(
          buildAlert('DRIFT', snapshot, o.outcome, {
            from: round(first),
            to: round(last),
            changePct: round(changePct, 1),
            message:
              `Alta em "${o.outcome}": ${round(first)} para ${round(last)} ` +
              `(+${round(changePct, 1)}%). Dinheiro saindo desse resultado.`,
          }),
        )
      }
    }
  }

  // Alerta de valor
  const analysis = detectValueBets(snapshot.outcomes, { minEdge: THRESHOLDS.minEdge })
  for (const vb of analysis.valueBets) {
    alerts.push(
      buildAlert('VALUE', snapshot, vb.outcome, {
        bestOdd: vb.bestOdd,
        fairOdd: vb.fairOdd,
        edge: vb.edge,
        confidence: vb.confidence,
        message:
          `Oportunidade de valor em "${vb.outcome}": mercado ${vb.bestOdd} ` +
          `vs odd justa ${vb.fairOdd}. Retorno esperado ${vb.edge}%.`,
      }),
    )
  }

  return alerts
}

let seq = 0
function buildAlert(type, snapshot, outcome, data) {
  seq += 1
  return {
    id: `alt_${Date.now()}_${seq}`,
    type, // STEAM | DRIFT | VALUE
    severity: type === 'STEAM' ? 'high' : type === 'VALUE' ? 'medium' : 'low',
    matchId: snapshot.matchId,
    matchLabel: snapshot.matchLabel,
    outcome,
    time: new Date().toISOString(),
    ...data,
  }
}

/* ------------------------------------------------------------------ *
 * Simulador para desenvolvimento / demo
 * ------------------------------------------------------------------ */

const DEMO_MATCHES = [
  { matchId: '1', matchLabel: 'Palmeiras x Flamengo', base: [1.95, 3.5, 4.2] },
  { matchId: '2', matchLabel: 'Sao Paulo x Corinthians', base: [2.1, 3.3, 3.7] },
  { matchId: '3', matchLabel: 'Manchester City x Arsenal', base: [1.7, 3.9, 5.1] },
]
const OUTCOMES = ['Casa', 'Empate', 'Fora']
const state = new Map()

function nudge(base) {
  // varia a odd por tick; movimentos fortes ocasionais geram steam/drift
  const strong = Math.random() < 0.35
  const pct = (Math.random() - 0.5) * (strong ? 0.12 : 0.04)
  return Math.max(1.05, base * (1 + pct))
}

/**
 * Inicia o simulador. Chama `onAlerts(alerts)` a cada tick que gerar alertas.
 * @returns {() => void} funcao para parar o simulador
 */
export function startSimulator(onAlerts, intervalMs = 3000) {
  for (const m of DEMO_MATCHES) state.set(m.matchId, [...m.base])

  const timer = setInterval(() => {
    for (const m of DEMO_MATCHES) {
      const current = state.get(m.matchId).map((v) => nudge(v))
      state.set(m.matchId, current)

      const snapshot = {
        matchId: m.matchId,
        matchLabel: m.matchLabel,
        outcomes: OUTCOMES.map((outcome, i) => ({
          outcome,
          // simula pequenas diferencas entre 4 casas em torno da odd atual
          houseOdds: [0, 1, 2, 3].map((h) => {
            // uma casa ocasionalmente fica "atrasada" (odd mais alta) -> gera value
            const lag = h === 2 && Math.random() < 0.25 ? 0.06 : 0
            return round(current[i] * (1 + (h - 1.5) * 0.01 + lag))
          }),
        })),
      }

      const alerts = ingestSnapshot(snapshot)
      if (alerts.length) onAlerts(alerts)
    }
  }, intervalMs)

  return () => clearInterval(timer)
}

export { THRESHOLDS }
