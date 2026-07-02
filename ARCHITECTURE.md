# 🏗️ iChico - Arquitetura & Tecnologia

## 📊 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + Vite)                    │
│  - Dashboard iChico                                             │
│  - Componentes: Score, Market, Smart Money, Consensus, Heat    │
│  - Gráficos com Recharts                                       │
│  - Tailwind CSS com paleta ChicoIA                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    API REST
                      (HTTP)
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                  │
│  - Endpoints iChico (Score, Market, Smart Money, etc)         │
│  - Agregação de dados de casas de apostas                     │
│  - Integração Claude API para insights                         │
│  - Mock data para MVP                                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    Database
                   (PostgreSQL)
                         │
┌────────────────────────▼────────────────────────────────────────┐
│              EXTERNAL SERVICES (Futures)                       │
│  - Bet365 API                                                  │
│  - Betano API                                                  │
│  - Estrela Bet API                                             │
│  - Melbet API                                                  │
│  - Claude API (Anthropic)                                      │
└────────────────────────────────────────────────────────────────┘
```

## 🎯 Stack Tecnológico

### Frontend
- **React 18** - UI library
- **Vite** - Build tool (3x faster than CRA)
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Charts library
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database (future)
- **CORS** - Cross-origin support
- **Dotenv** - Environment management
- **Anthropic SDK** - AI insights

### DevOps
- **Vercel** - Frontend deployment
- **Railway/Render** - Backend deployment
- **GitHub** - Version control
- **Git** - Version management

## 📦 Componentes Frontend

### Dashboard Principal
- Componente pai que orquestra todos os cards
- Gerencia estado de match selecionado
- Controla timeRange para gráficos

### ScoreCard
- **Propósito:** Exibir iChico Score (0-100)
- **Dados:** Score, trend, description
- **Gráfico:** LineChart com animação
- **Interatividade:** Mostra variação em tempo real

### MarketCard
- **Propósito:** Mostrar distribuição de apostas
- **Dados:** Percentual de apostas por resultado
- **Visualização:** Barras de progresso coloridas
- **Insight:** Volume em R$ por resultado

### SmartMoneyCard
- **Propósito:** Detectar movimentações anormais
- **Dados:** Timeline de mudanças de odds
- **Alertas:** Cores para diferentes tipos
- **Info:** Horário e intensidade da mudança

### ConsensusCard
- **Propósito:** Média de odds das casas
- **Dados:** % consenso e odd média
- **Casas:** Quantas e quais oferecem
- **Ranking:** Mostra concordância

### HeatCard
- **Propósito:** Ranking de eventos quentes
- **Dados:** Heat score (0-100) por match
- **Volume:** Mostra volume de apostas
- **Ranking:** Top 5 eventos do dia

### InsightCard
- **Propósito:** Insights gerados por IA
- **Dados:** Texto natural em português
- **Animação:** Loading simulado
- **Refresh:** Botão para novos insights

### OddsComparator
- **Propósito:** Comparação de odds das casas
- **Tabela:** View desktop com todas odds
- **Cards:** View mobile responsivo
- **Highlight:** Destaca melhor odd por resultado

## 🗄️ Modelo de Dados (Futuro)

### Tabelas PostgreSQL

```sql
-- Matches
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  team1_id INT,
  team2_id INT,
  league_id INT,
  start_time TIMESTAMP,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Odds History
CREATE TABLE odds_history (
  id SERIAL PRIMARY KEY,
  match_id INT,
  house_id INT,
  team1_odd DECIMAL,
  draw_odd DECIMAL,
  team2_odd DECIMAL,
  timestamp TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id)
);

-- iChico Scores
CREATE TABLE ichico_scores (
  id SERIAL PRIMARY KEY,
  match_id INT,
  score INT,
  trend_percent DECIMAL,
  timestamp TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id)
);

-- Smart Money Events
CREATE TABLE smart_money_events (
  id SERIAL PRIMARY KEY,
  match_id INT,
  odd_before DECIMAL,
  odd_after DECIMAL,
  volume BIGINT,
  detected_at TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id)
);
```

## 🔌 API Endpoints

### Padrão de Resposta
```json
{
  "data": {...},
  "success": true,
  "timestamp": "2024-07-02T15:50:00Z",
  "meta": {
    "version": "1.0",
    "cached": false
  }
}
```

### Endpoints Core

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/ichico/score` | Score principal |
| GET | `/api/ichico/market` | Distribuição de apostas |
| GET | `/api/ichico/consensus` | Média das casas |
| GET | `/api/ichico/smart-money` | Movimentações anormais |
| GET | `/api/ichico/heat` | Eventos quentes |
| GET | `/api/ichico/odds` | Odds comparadas |
| POST | `/api/ichico/insights` | Insights de IA |
| GET | `/api/matches` | Lista de partidas |

## 🎨 Design Tokens

### Cores
```css
--color-lime: #B8FF00   /* Primary */
--color-dark: #0a0a0a   /* Background */
--color-blue: #4A90E2   /* Accent */
--color-yellow: #ffeb3b /* Highlight */
--color-gray: #666      /* Secondary */
```

### Tipografia
- Font: System fonts (-apple-system, BlinkMacSystemFont, etc)
- Sizes: 12px, 14px, 16px, 18px, 24px, 32px, 48px, 64px

### Espaçamento
- 4px, 8px, 12px, 16px, 24px, 32px, 48px

### Borders
- Radius: 4px, 8px, 16px
- Width: 1px (subtle), 2px (emphasis)

## 🔐 Segurança

### Frontend
- HTTPS obrigatório
- CSRF protection via same-site cookies
- XSS prevention via React DOM escaping
- Rate limiting no client

### Backend
- API Key validation
- CORS whitelist
- Request validation
- SQL injection prevention (via ORM)
- Rate limiting middleware

### Dados
- Não armazena senhas
- GDPR compliant
- Dados de apostas públicos

## 📈 Performance

### Frontend
- Vite (0.3s build)
- Code splitting automático
- Lazy loading de componentes
- Memoization em dados státicos

### Backend
- Response time < 200ms
- Redis cache (futuro)
- Database indexing
- Connection pooling

### Assets
- Imagens otimizadas
- CSS minificado
- JS minificado e comprimido
- Gzip compression

## 🧪 Testes (Roadmap)

```
- Unit Tests (Jest)
- Integration Tests (Supertest)
- E2E Tests (Cypress)
- Performance Tests (Lighthouse)
- Security Tests (OWASP)
```

## 📡 Escalabilidade

### Horizontal Scaling
- Frontend: Vercel CDN global
- Backend: Load balancer + múltiplas instâncias

### Vertical Scaling
- Database: Read replicas
- Cache: Redis distributed
- Queue: Bull/BullMQ para jobs

## 🔄 CI/CD

```
GitHub → GitHub Actions → Tests → Deploy
   ↓
   ├─ Frontend → Vercel
   └─ Backend → Railway/Render
```

---

**Próximas Fases:**
1. Integração com APIs reais das casas
2. WebSocket para dados live
3. Database com histórico completo
4. Sistema de alertas
5. Mobile app nativa
