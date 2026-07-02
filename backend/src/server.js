import http from 'http'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { detectValueBets, describeValueBet } from './services/valueBets.js'
import { attachWebSocket } from './ws.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

/* ----------------------------- Dados mock ----------------------------- */
// Em producao, troque por odds reais coletadas das casas.
const MATCH_ODDS = {
  1: {
    label: 'Palmeiras x Flamengo',
    outcomes: [
      { outcome: 'Vitoria Palmeiras', houseOdds: [1.92, 2.05, 1.88, 2.1] },
      { outcome: 'Empate', houseOdds: [3.4, 3.35, 3.5, 3.25] },
      { outcome: 'Vitoria Flamengo', houseOdds: [4.2, 3.98, 4.35, 3.95] },
    ],
  },
  2: {
    label: 'Sao Paulo x Corinthians',
    outcomes: [
      { outcome: 'Vitoria Sao Paulo', houseOdds: [2.15, 2.2, 2.08, 2.25] },
      { outcome: 'Empate', houseOdds: [3.2, 3.15, 3.3, 3.1] },
      { outcome: 'Vitoria Corinthians', houseOdds: [3.6, 3.5, 3.7, 3.45] },
    ],
  },
}

/* ------------------------------ Rotas -------------------------------- */

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'iChico API running' })
})

// Value Bets automaticos
app.get('/api/ichico/value-bets', (req, res) => {
  try {
    const matchId = req.query.matchId || '1'
    const match = MATCH_ODDS[matchId]
    if (!match) return res.status(404).json({ message: 'Partida nao encontrada' })

    const minEdge = req.query.minEdge ? Number(req.query.minEdge) : 1.5
    const analysis = detectValueBets(match.outcomes, { minEdge })

    const valueBets = analysis.valueBets.map((vb) => ({
      ...vb,
      description: describeValueBet(vb, match.label),
    }))

    res.json({
      matchId,
      matchLabel: match.label,
      overround: analysis.overround,
      outcomes: analysis.outcomes,
      valueBets,
      hasValue: analysis.hasValue,
      generatedAt: analysis.generatedAt,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/ichico/score', (req, res) => {
  res.json({ score: 75, trend: '+5.2%', description: 'Mercado otimista', timestamp: new Date().toISOString() })
})

app.get('/api/matches', (req, res) => {
  res.json({
    matches: Object.entries(MATCH_ODDS).map(([id, m]) => ({ id, label: m.label })),
    total: Object.keys(MATCH_ODDS).length,
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error' })
})

/* ------------------------ HTTP + WebSocket --------------------------- */
const server = http.createServer(app)
attachWebSocket(server, { simulate: true })

server.listen(PORT, () => {
  console.log(`iChico API na porta ${PORT}`)
  console.log(`Health: http://localhost:${PORT}/api/health`)
  console.log(`Value bets: http://localhost:${PORT}/api/ichico/value-bets?matchId=1`)
})
