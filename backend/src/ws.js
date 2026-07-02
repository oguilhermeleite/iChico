/**
 * iChico WebSocket - transmite alertas ao vivo para os clientes conectados.
 *
 * Protocolo (mensagens JSON do servidor -> cliente):
 *   { type: 'welcome', ts }
 *   { type: 'alerts', data: Alert[] }
 *
 * O cliente pode enviar { type: 'ping' } e recebe { type: 'pong' }.
 */

import { WebSocketServer } from 'ws'
import { startSimulator } from './services/alertEngine.js'

export function attachWebSocket(server, { simulate = true } = {}) {
  const wss = new WebSocketServer({ server, path: '/ws/alerts' })

  const broadcast = (payload) => {
    const msg = JSON.stringify(payload)
    for (const client of wss.clients) {
      if (client.readyState === 1) client.send(msg)
    }
  }

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: 'welcome', ts: Date.now() }))

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString())
        if (msg.type === 'ping') ws.send(JSON.stringify({ type: 'pong' }))
      } catch {
        /* ignora mensagens malformadas */
      }
    })
  })

  let stop = null
  if (simulate) {
    stop = startSimulator((alerts) => broadcast({ type: 'alerts', data: alerts }))
  }

  console.log('WebSocket de alertas ativo em /ws/alerts')

  return { wss, broadcast, stop }
}
