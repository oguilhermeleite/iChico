import { useEffect, useState } from 'react'

/**
 * Hook que simula alertas realistas sem depender de WebSocket.
 * Gera STEAM, DRIFT, VALUE alerts periodicamente.
 */
export function useAlertsSimulated() {
  const [alerts, setAlerts] = useState([])
  const [status] = useState('online')

  useEffect(() => {
    // Dados simulados de alertas
    const mockAlerts = [
      {
        id: 'a1',
        type: 'STEAM',
        label: 'Smart Money',
        matchLabel: 'Palmeiras vs Flamengo',
        message: 'Queda de 2.15 para 2.02 em Vitória Palmeiras. Alto volume detectado',
        time: new Date(Date.now() - 5 * 60000).toISOString(),
      },
      {
        id: 'a2',
        type: 'DRIFT',
        label: 'Drift',
        matchLabel: 'Palmeiras vs Flamengo',
        message: 'Aumento de 3.20 para 3.45 em Empate. Saída de apostas detectada',
        time: new Date(Date.now() - 12 * 60000).toISOString(),
      },
      {
        id: 'a3',
        type: 'VALUE',
        label: 'Valor',
        matchLabel: 'Palmeiras vs Flamengo',
        message: 'Oportunidade +EV detectada: Vitória Flamengo a 5.10 com edge de +12.3%',
        time: new Date(Date.now() - 18 * 60000).toISOString(),
      },
      {
        id: 'a4',
        type: 'STEAM',
        label: 'Smart Money',
        matchLabel: 'Palmeiras vs Flamengo',
        message: 'Mudança brusca detectada: Smart Money entrando forte em Palmeiras',
        time: new Date(Date.now() - 25 * 60000).toISOString(),
      },
    ]

    setAlerts(mockAlerts)
  }, [])

  const clear = () => setAlerts([])

  return { alerts, status, clear }
}
