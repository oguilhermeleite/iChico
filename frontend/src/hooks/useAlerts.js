import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Conecta ao WebSocket de alertas do iChico e mantem a lista mais recente.
 * Reconecta automaticamente com backoff simples.
 *
 * @param {string} url  ex: ws://localhost:3001/ws/alerts
 * @param {object} [opts]
 * @param {number} [opts.max=40]  maximo de alertas mantidos em memoria
 */
export function useAlerts(url, { max = 40 } = {}) {
  const [alerts, setAlerts] = useState([])
  const [status, setStatus] = useState('connecting') // connecting | online | offline
  const wsRef = useRef(null)
  const retryRef = useRef(0)

  const connect = useCallback(() => {
    let ws
    try {
      ws = new WebSocket(url)
    } catch {
      setStatus('offline')
      return
    }
    wsRef.current = ws

    ws.onopen = () => {
      setStatus('online')
      retryRef.current = 0
    }

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data)
        if (msg.type === 'alerts' && Array.isArray(msg.data)) {
          setAlerts((prev) => [...msg.data, ...prev].slice(0, max))
        }
      } catch {
        /* ignora */
      }
    }

    ws.onclose = () => {
      setStatus('offline')
      const delay = Math.min(1000 * 2 ** retryRef.current, 10000)
      retryRef.current += 1
      setTimeout(connect, delay)
    }

    ws.onerror = () => ws.close()
  }, [url, max])

  useEffect(() => {
    connect()
    return () => wsRef.current?.close()
  }, [connect])

  const clear = useCallback(() => setAlerts([]), [])

  return { alerts, status, clear }
}
