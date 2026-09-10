import meiMetricsMock from '@/mocks/meiMetrics.json';
import recentProposalsMock from '@/mocks/recentProposals.json';
import monthlyHighlightsMock from '@/mocks/monthlyHighlights.json';
import defaultProposalMock from '@/mocks/defaultProposal.json';
import userMock from '@/mocks/user.json';
import recibosMock from '@/mocks/recibos.json';
import monthlyRevenuesMock from '@/mocks/monthlyRevenues.json';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005';

export async function fetchMonthlyRevenues() {
  return monthlyRevenuesMock;
}

export async function fetchRecibos() {
  try {
    const res = await fetch(`${API_BASE}/api/recibos`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar recibos');
    return await res.json();
  } catch {
    return recibosMock;
  }
}

export async function fetchMeiMetrics() {
  try {
    const res = await fetch(`${API_BASE}/api/mei/metrics`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar métricas');
    return await res.json();
  } catch {
    return meiMetricsMock;
  }
}

export async function fetchMonthlyHighlights() {
  return monthlyHighlightsMock;
}

export async function fetchOrcamentos() {
  try {
    const res = await fetch(`${API_BASE}/api/orcamentos`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar orçamentos');
    return await res.json();
  } catch {
    return recentProposalsMock;
  }
}

export async function createOrcamento(data: any) {
  try {
    const res = await fetch(`${API_BASE}/api/orcamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Falha ao criar orçamento');
    return await res.json();
  } catch {
    return {
      id: `orc-local-${Date.now()}`,
      codigo: `ORC-2026-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    };
  }
}

export function getDefaultProposal() {
  return defaultProposalMock;
}

export function getUserData() {
  return userMock;
}
