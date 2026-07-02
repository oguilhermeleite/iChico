# iChico

Indice de apostas esportivas com deteccao automatica de apostas +EV (Expected Value
Positivo) e alertas de mercado em tempo real.

## O que e +EV

+EV significa Expected Value Positivo (Valor Esperado Positivo).

E uma aposta em que a odd oferecida pela casa e maior do que deveria ser, dando
vantagem matematica ao apostador no longo prazo.

**Exemplo**
Voce calcula que um time tem 60% de chance de vencer.
A odd justa seria 1.67 (1 dividido por 0.60).
Mas a casa esta pagando 2.00.

Essa e uma aposta +EV, porque a casa esta pagando como se o time tivesse apenas 50%
de chance, enquanto a chance real e de 60%. A longo prazo, apostas desse tipo tendem
a gerar lucro.

- **+EV**: vantagem para o apostador.
- **-EV**: vantagem para a casa de apostas.

**Resumindo em uma frase**: uma aposta +EV e uma aposta com "valor", onde a
probabilidade real de acontecer e maior do que a probabilidade implicita na odd
oferecida pela casa. O resultado de uma aposta isolada pode ser vitoria ou derrota,
mas repetindo esse tipo de aposta muitas vezes a expectativa matematica e positiva.

## Features

- **Value Bets (+EV)**: deteccao automatica comparando a odd justa (metodo no-vig,
  que remove a margem das casas) com a melhor odd disponivel no mercado.
- **Alertas em tempo real**: WebSocket que identifica movimentos de mercado
  - `STEAM`: queda rapida de odd, possivel entrada de dinheiro profissional
  - `DRIFT`: alta de odd, saida de apostas daquele resultado
  - `VALUE`: surgimento de uma oportunidade +EV
- **Comparador de odds**: melhor odd entre as casas para cada resultado
- **iChico Score, Market, Consenso, Heat**: visao geral do mercado por partida

## Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, WebSocket (ws)

## Setup

```bash
# Frontend
cd frontend
npm install
npm run dev
# http://localhost:5173

# Backend
cd backend
npm install
npm run dev
# http://localhost:3001
# WebSocket de alertas: ws://localhost:3001/ws/alerts
```

## Metodologia (no-vig / fair odds)

1. Para cada resultado, calcula a probabilidade implicita: `1 / odd media`
2. Soma as probabilidades de todos os resultados (overround = margem das casas)
3. Normaliza removendo o overround, obtendo a probabilidade "justa"
4. Odd justa = `1 / probabilidade justa`
5. Ha valor (+EV) quando a melhor odd de mercado supera a odd justa

O retorno esperado (edge) e calculado como:
`edge = (melhorOdd * probabilidadeJusta - 1) * 100`

## Aviso

Aposte com responsabilidade. Retorno esperado positivo (+EV) nao garante o resultado
de uma aposta isolada; e um conceito estatistico valido no longo prazo.
