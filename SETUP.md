# Setup - iChico

Passo a passo para rodar o iChico localmente (frontend + backend).

## Pré-requisitos

- Node.js 18+
- npm ou yarn

## 1. Frontend (React 18 + Vite)

```bash
cd frontend
npm install
npm run dev
```

Acessa: **http://localhost:5173**

O frontend vai tentar conectar ao backend em `http://localhost:3001`.

## 2. Backend (Node.js + Express + WebSocket)

Em outro terminal:

```bash
cd backend
npm install
npm run dev
```

Backend roda em: **http://localhost:3001**

Endpoints disponíveis:
- `GET /api/health` → status
- `GET /api/ichico/value-bets?matchId=1` → apostas +EV
- `GET /api/matches` → partidas
- `WS /ws/alerts` → alertas em tempo real (WebSocket)

## 3. Teste

Abra http://localhost:5173 no navegador:

1. Verá o dashboard do iChico
2. **Value Bets Panel**: detecta apostas com Expected Value Positivo
3. **Alertas Feed**: mostra movimentações de mercado em tempo real (STEAM, DRIFT, VALUE)
4. **Market Value Connect**: conecta onde o dinheiro está indo com onde está o valor

Troque de partida (dropdown no topo) para ver dados diferentes.

## Troubleshooting

### Backend não conecta
- Verifica se `http://localhost:3001` está respondendo: `curl http://localhost:3001/api/health`
- Se não: reinicia backend com `npm run dev`

### WebSocket não funciona
- Frontend tenta conectar em `ws://localhost:3001/ws/alerts`
- Se não conectar: backend pode estar offline ou porta diferente
- Verifica console do navegador (F12 → Console)

### Port já em uso
```bash
# Muda porta do backend (arquivo backend/src/server.js):
# const PORT = process.env.PORT || 3001
PORT=3050 npm run dev
```

Depois atualiza frontend: abra `frontend/vite.config.js` e muda URL da API.

## Estrutura

```
iChico/
├── frontend/
│   ├── src/
│   │   ├── components/     (UI components)
│   │   ├── pages/          (Dashboard principal)
│   │   ├── lib/            (Logica de value bets)
│   │   ├── hooks/          (useAlerts para WebSocket)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── services/       (valueBets.js, alertEngine.js)
│   │   ├── server.js       (Express + WebSocket)
│   │   └── ws.js           (Setup WebSocket)
│   ├── package.json
│   └── vercel.json         (config deploy)
└── README.md
```

## Deploy

Frontend + Backend prontos pra deploy em Vercel / Railway / qualquer host.

Veja `README.md` seção "Deploy" para instruções.
