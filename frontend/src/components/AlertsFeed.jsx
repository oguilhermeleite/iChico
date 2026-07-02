import { useAlerts } from '../hooks/useAlerts'

const TYPE_META = {
 STEAM: { label: 'Smart Money', color: '#ff4d4d', tone: 'Queda rapida de odd' },
 DRIFT: { label: 'Drift', color: '#6b7280', tone: 'Odd em alta' },
 VALUE: { label: 'Valor', color: '#B8FF00', tone: 'Oportunidade detectada' },
}

function timeAgo(iso) {
 const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000))
 if (s < 60) return `${s}s`
 const m = Math.floor(s / 60)
 return `${m}min`
}

export default function AlertsFeed({ wsUrl }) {
 const { alerts, status, clear } = useAlerts(wsUrl)

 const statusLabel =
 status === 'online' ? 'Ao vivo' : status === 'connecting' ? 'Conectando' : 'Offline'
 const statusColor =
 status === 'online' ? '#B8FF00' : status === 'connecting' ? '#ffeb3b' : '#6b7280'

 return (
    <div className="bg-secondary border border-chicoia-lime/20 rounded-lg p-5"><div className="flex items-center justify-between mb-4"><div><p className="text-[11px] tracking-widest text-gray-500 uppercase">Tempo real</p><h3 className="text-lg font-bold text-chicoia-lime">Alertas</h3></div><div className="flex items-center gap-3"><span className="flex items-center gap-2 text-xs" style={{ color: statusColor }}><span
 className="inline-block w-2 h-2 rounded-full"
 style={{ backgroundColor: statusColor }}
            />{statusLabel}
          </span><button
 onClick={clear}
 className="text-xs text-gray-500 hover:text-chicoia-lime transition-colors"
          >Limpar
          </button></div></div>{alerts.length === 0 ? (
        <div className="text-sm text-gray-500 py-8 text-center border border-dashed border-gray-700 rounded-lg">Aguardando movimentacoes do mercado.
        </div>) : (
        <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">{alerts.map((a) => {
 const meta = TYPE_META[a.type] ?? TYPE_META.DRIFT
 return (
              <li
 key={a.id}
 className="bg-primary rounded-lg p-3 border-l-2"
 style={{ borderColor: meta.color }}
              ><div className="flex items-center justify-between mb-1"><span
 className="text-[11px] font-bold uppercase tracking-wide"
 style={{ color: meta.color }}
                  >{meta.label}
                  </span><span className="text-[11px] text-gray-500">{timeAgo(a.time)}</span></div><p className="text-xs text-gray-500 mb-1">{a.matchLabel}</p><p className="text-sm text-gray-200 leading-snug">{a.message}</p></li>)
          })}
        </ul>)}
    </div>)
}
