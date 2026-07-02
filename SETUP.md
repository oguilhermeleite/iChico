# 🚀 iChico - Setup & Deployment Guide

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

## 🛠️ Setup Local

### 1. Clone e Instale

```bash
# Clone o repositório
git clone https://github.com/oguilhermeleite/ichico.git
cd ichico

# Frontend
cd frontend
npm install

# Backend (em outro terminal)
cd backend
npm install
```

### 2. Configure Variáveis de Ambiente

**Frontend** (frontend/.env)
```
VITE_API_URL=http://localhost:3001
```

**Backend** (backend/.env)
```
PORT=3001
NODE_ENV=development
CLAUDE_API_KEY=seu_key_aqui
```

### 3. Inicie os Servidores

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
→ http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
→ http://localhost:3001/api/health

## 📊 Estrutura de Diretórios

```
ichico/
├── frontend/                 # React + Vite App
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── ScoreCard.jsx
│   │   │   ├── MarketCard.jsx
│   │   │   ├── SmartMoneyCard.jsx
│   │   │   ├── ConsensusCard.jsx
│   │   │   ├── HeatCard.jsx
│   │   │   ├── InsightCard.jsx
│   │   │   ├── OddsComparator.jsx
│   │   │   └── Navigation.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── data/
│   │   │   └── mockData.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   └── server.js        # API Principal
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🎨 Design System

### Paleta de Cores
- **Lima:** #B8FF00 (primary)
- **Dark:** #0a0a0a (fundo)
- **Azul:** #4A90E2 (acentos)
- **Amarelo:** #ffeb3b (destaques)
- **Branco:** #ffffff (texto)

### Componentes Principais

1. **ScoreCard** - Indicador 0-100 com gráfico
2. **MarketCard** - Distribuição de apostas
3. **SmartMoneyCard** - Movimentações anormais
4. **ConsensusCard** - Média das casas
5. **HeatCard** - Eventos mais apostados
6. **InsightCard** - Análise de IA
7. **OddsComparator** - Comparação de odds

## 🚀 Deployment

### Frontend (Vercel)

1. Conecte seu GitHub repo
2. Selecione `frontend` como root directory
3. Configure variável: `VITE_API_URL=https://seu-backend.com`
4. Deploy automático ao fazer push

### Backend (Railway ou Render)

**Railway:**
1. Conecte seu GitHub
2. Selecione `backend` como root directory
3. Configure variáveis de ambiente
4. Deploy automático

**Render:**
1. Crie novo Web Service
2. Conecte GitHub
3. Configure:
   - Start Command: `npm run start`
   - Root Directory: `backend`
4. Deploy

## 📡 API Endpoints

### iChico Score
```
GET /api/ichico/score?matchId=1&timeRange=24h
```

### Market Data
```
GET /api/ichico/market?matchId=1
```

### Consensus
```
GET /api/ichico/consensus?matchId=1
```

### Smart Money
```
GET /api/ichico/smart-money?matchId=1
```

### Heat Map
```
GET /api/ichico/heat
```

### Odds Comparison
```
GET /api/ichico/odds?matchId=1
```

### AI Insights
```
POST /api/ichico/insights
Body: { matchId, context }
```

### Matches List
```
GET /api/matches
```

## 🔄 Integração com ChicoIA

Para integrar como ABA no ChicoIA principal:

1. Adicione `iChico` à navegação
2. Configure rota: `/ichico`
3. Compartilhe paleta de cores e componentes
4. Use o serviço de autenticação do ChicoIA

## 🧪 Mock Data

Dados de teste estão em `frontend/src/data/mockData.js`

Para usar dados reais:
- Integre APIs das casas de apostas
- Configure webhooks para atualização em tempo real
- Use Redis para cache

## 📝 Roadmap

- [ ] WebSocket para dados live
- [ ] Alertas de Smart Money
- [ ] Histórico completo de odds
- [ ] Recomendações personalizadas
- [ ] Mobile app
- [ ] Integração Telegram/Discord

## 🤝 Contribuindo

```bash
# Crie uma branch
git checkout -b feature/sua-feature

# Faça commits
git commit -am 'Add feature'

# Push
git push origin feature/sua-feature

# Crie Pull Request
```

## 📞 Suporte

- Issues: github.com/oguilhermeleite/ichico/issues
- Email: oguilhermeleite@gmail.com
- Twitter: @Brainiac_OG

---

**Criado por:** Guilherme Leite | **Stack:** React + Node.js + Tailwind | **Deploy:** Vercel + Railway
