import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TeamStatsPanel from '../components/TeamStatsPanel'
import Navigation from '../components/Navigation'

export default function TeamPage() {
  const { teamId } = useParams()
  const navigate = useNavigate()

  // Mock de times - será substituído por dados reais
  const teams = {
    '1': 'Palmeiras',
    '2': 'Flamengo',
    '3': 'Santos',
    '4': 'Corinthians',
    '5': 'São Paulo',
    '6': 'Atlético MG',
  }

  const teamName = teams[teamId] || 'Time Desconhecido'

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-400">
          <button onClick={() => navigate('/')} className="text-chicoia-lime hover:underline">
            Dashboard
          </button>
          <span className="mx-2">/</span>
          <span>{teamName}</span>
        </div>

        {/* Main Content */}
        <TeamStatsPanel teamName={teamName} season="2024" />
      </div>
    </div>
  )
}
