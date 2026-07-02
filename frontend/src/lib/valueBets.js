// Logica de value bets para o cliente (espelha backend/src/services/valueBets.js)
const round = (n, d = 2) => Number(n.toFixed(d))

export function detectValueBets(outcomes, { minEdge = 1.5 } = {}) {
  const rows = outcomes.map((o) => {
    const houses = o.houseOdds.filter((v) => typeof v === 'number' && v > 1)
    const avgOdd = houses.reduce((a, b) => a + b, 0) / houses.length
    const bestOdd = Math.max(...houses)
    const impliedProb = 1 / avgOdd
    const variance = houses.reduce((a, b) => a + (b - avgOdd) ** 2, 0) / houses.length
    return { ...o, houses, avgOdd, bestOdd, impliedProb, stdDev: Math.sqrt(variance) }
  })

  const overround = rows.reduce((a, r) => a + r.impliedProb, 0)

  const analysed = rows.map((r) => {
    const trueProb = r.impliedProb / overround
    const fairOdd = 1 / trueProb
    const edge = (r.bestOdd * trueProb - 1) * 100
    const houseScore = Math.min(r.houses.length / 5, 1)
    const dispersionScore = Math.max(0, 1 - r.stdDev / (r.avgOdd * 0.15))
    const confidence = round((houseScore * 0.5 + dispersionScore * 0.5) * 10, 1)
    return {
      outcome: r.outcome,
      trueProb: round(trueProb * 100, 1),
      fairOdd: round(fairOdd),
      bestOdd: round(r.bestOdd),
      avgOdd: round(r.avgOdd),
      edge: round(edge, 1),
      confidence,
      houses: r.houses.length,
      isValue: edge >= minEdge,
    }
  })

  return {
    overround: round((overround - 1) * 100, 1),
    outcomes: analysed,
    valueBets: analysed.filter((a) => a.isValue).sort((a, b) => b.edge - a.edge),
    hasValue: analysed.some((a) => a.isValue),
  }
}
