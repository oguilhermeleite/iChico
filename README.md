# iChico

Indice de apostas esportivas com deteccao automatica de apostas +EV (Expected Value Positivo) e alertas de mercado em tempo real.

Construido com **React 18 + Vite** (frontend) e **Node.js + Express + WebSocket** (backend).

## O que e +EV

+EV significa Expected Value Positivo (Valor Esperado Positivo).

E uma aposta em que a odd oferecida pela casa e maior do que deveria ser, dando vantagem matematica ao apostador no longo prazo.

### Exemplo

Voce calcula que um time tem 60% de chance de vencer.
A odd justa seria 1.67 (1 dividido por 0.60).
Mas a casa esta pagando 2.00.

Essa e uma aposta +EV, porque a casa esta pagando como se o time tivesse apenas 50% de chance, enquanto a chance real e de 60%. A longo prazo, apostas desse tipo tendem a gerar lucro.

- **+EV**: vantagem para o apostador.
- **-EV**: vantagem para a casa de apostas.

**Resumindo**: uma aposta +EV e uma aposta com "valor", onde a probabilidade real de acontecer e maior do que a probabilidade implicita na odd oferecida pela casa. O resultado de uma aposta isolada pode ser vitoria ou derrota, mas repetindo esse tipo de aposta muitas vezes a expectativa matematica e positiva.

## Features

- **Value Bets (+EV)**: deteccao automatica comparando a odd justa (metodo no-vig, que remove a margem das casas) com a melhor odd disponivel no mercado. Badge +EV visual com tooltip explicativo.

- **Alertas em tempo real via WebSocket**: identifica movimentos de mercado
  - `STEAM`: queda rapida de odd, possivel entrada de dinheiro profissional (smart money)
  - `DRIFT`: alta de odd, saida de apostas daquele resultado
  - `VALUE`: surgimento de uma oportunidade +EV

- **Market Value Connect**: conecta onde o dinheiro dos apostadores esta indo (iChico Market) com onde esta o valor real (+EV), mostrando a relacao entre os dois pra ajudar o usuario a ganhar mais dinheiro.

- **iChico Score, Market, Consenso, Heat**: visao geral do mercado por partida

- **Comparador de Odds**: melhor odd entre as casas para cada resultado

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, WebSocket (ws)
- **Backend**: Node.js, Express, WebSocket (ws)
- **Database Mock**: dados em memoria (simulador de mercado)

## Quick Start

### Rodar localmente

```bash
# Frontend
cd frontend
npm install
npm run dev
# Acessa: http://localhost:5173

# Backend (em outro terminal)
cd backend
npm install
npm run dev
# Roda em: http://localhost:3001
```

Veja `SETUP.md` para troubleshooting e detalhes completos.

### Testar

1. Abra http://localhost:5173
2. Verá o dashboard com Value Bets e Alertas em tempo real
3. Clique no "i" do Value Bets panel para ver explicacao de +EV
4. Troque de partida no dropdown pra ver dados diferentes

## Metodologia (no-vig / fair odds)

A deteccao de value bets segue o metodo no-vig (sem-vig):

1. Para cada resultado, calcula a probabilidade implicita: `1 / odd media`
2. Soma as probabilidades de todos os resultados (overround = margem das casas)
3. Normaliza removendo o overround, obtendo a probabilidade "justa"
4. Odd justa = `1 / probabilidade justa`
5. Ha valor (+EV) quando a melhor odd de mercado supera a odd justa

O retorno esperado (edge) e calculado como:
```
edge = (melhorOdd * probabilidadeJusta - 1) * 100
```

Exemplo:
- Odd justa calculada: 1.85
- Melhor odd no mercado: 2.10
- Edge: +13.5% de retorno esperado

## Endpoints da API

```
GET  /api/health                        → Status
GET  /api/ichico/value-bets?matchId=1  → Apostas +EV detectadas
GET  /api/matches                       → Lista de partidas
WS   /ws/alerts                         → Stream de alertas (STEAM, DRIFT, VALUE)
```

### Exemplo: GET /api/ichico/value-bets

```json
{
  "matchId": "1",
  "matchLabel": "Palmeiras x Flamengo",
  "overround": 4.2,
  "outcomes": [
    {
      "outcome": "Vitoria Palmeiras",
      "trueProb": 48.3,
      "fairOdd": 2.07,
      "bestOdd": 2.1,
      "edge": 1.4,
      "confidence": 7.5,
      "isValue": false
    }
  ],
  "valueBets": [...],
  "hasValue": false
}
```

## Estrutura do Projeto

```
iChico/
├── frontend/                    # React 18 + Vite
│   ├── src/
│   │   ├── components/          # UI (Value Bets, Alerts, Market, etc)
│   │   ├── pages/Dashboard.jsx  # Tela principal
│   │   ├── lib/valueBets.js     # Motor de deteccao +EV
│   │   ├── hooks/useAlerts.js   # Hook WebSocket
│   │   └── data/mockData.js     # Dados mock das partidas
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Node.js + Express
│   ├── src/
│   │   ├── server.js            # Express + WebSocket
│   │   ├── ws.js                # Setup WebSocket
│   │   ├── services/
│   │   │   ├── valueBets.js     # Motor de value bets
│   │   │   └── alertEngine.js   # Deteccao de alertas (steam/drift)
│   │   └── routes/              # Rotas da API
│   ├── package.json
│   └── vercel.json              # Config Vercel
├── SETUP.md                     # Setup local passo-a-passo
└── README.md                    # Este arquivo
```

## Aviso Important

Aposte com responsabilidade. Retorno esperado positivo (+EV) nao garante o resultado de uma aposta isolada; e um conceito estatistico valido no longo prazo. A industria de apostas e risco.

## Licenca

MIT
