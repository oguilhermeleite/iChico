/**
 * iChico Value Bets Engine
 *
 * Detecta apostas de valor comparando a "odd justa" (fair odd, sem margem
 * da casa) com a melhor odd disponivel no mercado.
 *
 * Metodo (no-vig / fair odds):
 *  1. Para cada resultado, calcula a probabilidade implicita: 1 / odd_media
 *  2. Soma as probabilidades (overround = margem embutida das casas)
 *  3. Normaliza removendo o overround -> probabilidade "justa"
 *  4. Fair odd = 1 / probabilidade justa
 *  5. Ha valor quando a melhor odd de mercado supera a fair odd
 *
 * edge (%) = (melhorOdd * probJusta - 1) * 100  -> retorno esperado por unidade
 */

const round = (n, d = 2) => Number(n.toFixed(d))

/**
 * @param {Array<{ outcome:string, houseOdds:number[] }>} outcomes
 *   Cada resultado com as odds de cada casa.
 * @param {object} [opts]
 * @param {number} [opts.minEdge=1.5]  Edge minimo (%) para considerar value.
 * @returns {object}  Analise completa com value bets ordenados.
 */
export function detectValueBets(outcomes, opts = {}) {
  const minEdge = opts.minEdge ?? 1.5

  // Passo 1-2: media das odds e probabilidade implicita
  const rows = outcomes.map((o) => {
    const houses = o.houseOdds.filter((v) => typeof v === 'number' && v > 1)
    const avgOdd = houses.reduce((a, b) => a + b, 0) / houses.length
    const bestOdd = Math.max(...houses)
    const impliedProb = 1 / avgOdd

    // dispersao das odds -> usada na confianca (menor dispersao = mais consenso)
    const mean = avgOdd
    const variance =
      houses.reduce((a, b) => a + (b - mean) ** 2, 0) / houses.length
    const stdDev = Math.sqrt(variance)

    return { ...o, houses, avgOdd, bestOdd, impliedProb, stdDev }
  })

  // Passo 3: overround e normalizacao
  const overround = rows.reduce((a, r) => a + r.impliedProb, 0)

  const analysed = rows.map((r) => {
    const trueProb = r.impliedProb / overround // vig removido
    const fairOdd = 1 / trueProb
    const edge = (r.bestOdd * trueProb - 1) * 100
    const valuePct = (r.bestOdd / fairOdd - 1) * 100

    // Confianca (0-10): mais casas e menor dispersao aumentam a confianca
    const houseScore = Math.min(r.houses.length / 5, 1) // ate 5 casas
    const dispersionScore = Math.max(0, 1 - r.stdDev / (r.avgOdd * 0.15))
    const confidence = round((houseScore * 0.5 + dispersionScore * 0.5) * 10, 1)

    return {
      outcome: r.outcome,
      trueProb: round(trueProb * 100, 1), // em %
      fairOdd: round(fairOdd),
      bestOdd: round(r.bestOdd),
      avgOdd: round(r.avgOdd),
      edge: round(edge, 1), // retorno esperado %
      valuePct: round(valuePct, 1),
      confidence,
      houses: r.houses.length,
      isValue: edge >= minEdge,
    }
  })

  const valueBets = analysed
    .filter((a) => a.isValue)
    .sort((a, b) => b.edge - a.edge)

  return {
    overround: round((overround - 1) * 100, 1), // margem da casa em %
    outcomes: analysed,
    valueBets,
    hasValue: valueBets.length > 0,
    generatedAt: new Date().toISOString(),
  }
}

/**
 * Gera uma frase objetiva para o value bet (sem exageros).
 */
export function describeValueBet(vb, matchLabel) {
  const dir = vb.edge >= 6 ? 'forte' : vb.edge >= 3 ? 'moderado' : 'leve'
  return (
    `Valor ${dir} em "${vb.outcome}" (${matchLabel}). ` +
    `Probabilidade justa estimada de ${vb.trueProb}% implica odd justa ${vb.fairOdd}, ` +
    `mas o mercado oferece ${vb.bestOdd}. Retorno esperado de ${vb.edge}% por unidade. ` +
    `Confianca ${vb.confidence}/10 (${vb.houses} casas).`
  )
}
