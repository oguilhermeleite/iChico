export const mockData = {
  matches: [
    {
      id: '1',
      team1: 'Palmeiras',
      team2: 'Flamengo',
      league: 'Brasileirão',
      time: '20:00',
      score: '0-0',
      status: 'em_andamento',
      valueBets: [
        {
          market: 'Ambas Marcam - Sim',
          description: 'Ataque do Palmeiras contra defesa do Flamengo',
          fairOdd: 1.65,
          bestOdd: 1.72,
          valuePercent: 4.2
        },
        {
          market: 'Mais de 2.5 Gols',
          description: 'Histórico recente mostra alta densidade de gols',
          fairOdd: 2.10,
          bestOdd: 2.25,
          valuePercent: 7.1
        }
      ]
    },
    {
      id: '2',
      team1: 'São Paulo',
      team2: 'Corinthians',
      league: 'Brasileirão',
      time: '19:30',
      score: '-',
      status: 'proximo',
      valueBets: [
        {
          market: 'Vitória São Paulo',
          description: 'Performance recente favorável',
          fairOdd: 2.05,
          bestOdd: 2.15,
          valuePercent: 4.9
        }
      ]
    },
    {
      id: '3',
      team1: 'Manchester City',
      team2: 'Arsenal',
      league: 'Premier League',
      time: '16:00',
      score: '2-1',
      status: 'em_andamento',
      valueBets: []
    },
    {
      id: '4',
      team1: 'Real Madrid',
      team2: 'Barcelona',
      league: 'La Liga',
      time: '21:45',
      score: '-',
      status: 'proximo',
      valueBets: []
    },
    {
      id: '5',
      team1: 'Bayern Munich',
      team2: 'Borussia Dortmund',
      league: 'Bundesliga',
      time: '15:30',
      score: '-',
      status: 'proximo',
      valueBets: []
    },
  ],
  
  houses: [
    { name: 'Bet365', icon: '365', available: true },
    { name: 'Betano', icon: '🎰', available: true },
    { name: 'Estrela Bet', icon: '⭐', available: true },
    { name: 'Melbet', icon: '🎯', available: true },
    { name: 'Rivalo', icon: '🏆', available: true },
  ],

  indicators: {
    score: 75,
    trend: '+5.2%',
    volume: 'R$ 2.3M',
    confidence: '8.7/10',
  }
}
