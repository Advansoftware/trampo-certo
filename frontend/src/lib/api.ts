import meiMetricsMock from '@/mocks/meiMetrics.json';
import recentProposalsMock from '@/mocks/recentProposals.json';
import monthlyHighlightsMock from '@/mocks/monthlyHighlights.json';
import defaultProposalMock from '@/mocks/defaultProposal.json';
import userMock from '@/mocks/user.json';
import recibosMock from '@/mocks/recibos.json';
import monthlyRevenuesMock from '@/mocks/monthlyRevenues.json';
import clientesMock from '@/mocks/clientes.json';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005';

export async function fetchClientes() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_clientes_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {}
    }
  }
  try {
    const res = await fetch(`${API_BASE}/api/clientes`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar clientes');
    const data = await res.json();
    if (typeof window !== 'undefined' && Array.isArray(data)) {
      localStorage.setItem('tc_clientes_data', JSON.stringify(data));
    }
    return data;
  } catch {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tc_clientes_data', JSON.stringify(clientesMock));
    }
    return clientesMock;
  }
}

export async function createCliente(clienteData: any) {
  const newClient = {
    id: `cli-${Date.now()}`,
    totalFaturado: 0,
    totalPropostas: 0,
    propostasAprovadas: 0,
    ultimoServico: 'Hoje',
    status: 'ativo',
    tags: clienteData.tags || ['Novo Cliente'],
    ...clienteData,
  };

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_clientes_data');
    const list = saved ? JSON.parse(saved) : [...clientesMock];
    list.unshift(newClient);
    localStorage.setItem('tc_clientes_data', JSON.stringify(list));
  }

  return newClient;
}

export async function updateCliente(id: string, updates: any) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_clientes_data');
    const list = saved ? JSON.parse(saved) : [...clientesMock];
    const updatedList = list.map((c: any) => (c.id === id ? { ...c, ...updates } : c));
    localStorage.setItem('tc_clientes_data', JSON.stringify(updatedList));
    return updatedList.find((c: any) => c.id === id);
  }
  return updates;
}

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
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_orcamentos_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {}
    }
  }
  try {
    const res = await fetch(`${API_BASE}/api/orcamentos`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar orçamentos');
    const data = await res.json();
    if (typeof window !== 'undefined' && Array.isArray(data)) {
      localStorage.setItem('tc_orcamentos_data', JSON.stringify(data));
    }
    return data;
  } catch {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tc_orcamentos_data', JSON.stringify(recentProposalsMock));
    }
    return recentProposalsMock;
  }
}

export async function updateOrcamentoStatus(id: string, newStatus: string) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_orcamentos_data');
    const list = saved ? JSON.parse(saved) : [...recentProposalsMock];
    const updated = list.map((item: any) => (item.id === id ? { ...item, status: newStatus } : item));
    localStorage.setItem('tc_orcamentos_data', JSON.stringify(updated));
    return updated.find((i: any) => i.id === id);
  }
}

export async function updateOrcamento(id: string, data: any) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_orcamentos_data');
    const list = saved ? JSON.parse(saved) : [...recentProposalsMock];
    const updated = list.map((item: any) => (item.id === id ? { ...item, ...data } : item));
    localStorage.setItem('tc_orcamentos_data', JSON.stringify(updated));
    return updated.find((i: any) => i.id === id);
  }
}

export async function getOrcamentoById(id: string) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_orcamentos_data');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        const found = list.find((i: any) => i.id === id);
        if (found) return found;
      } catch {}
    }
  }
  const foundMock = (recentProposalsMock as any[]).find((i: any) => i.id === id);
  return foundMock || null;
}

export async function createOrcamento(data: any) {
  let created: any;
  try {
    const res = await fetch(`${API_BASE}/api/orcamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Falha ao criar orçamento');
    created = await res.json();
  } catch {
    created = {
      id: `orc-local-${Date.now()}`,
      codigo: `ORC-2026-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    };
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tc_orcamentos_data');
    const list = saved ? JSON.parse(saved) : [...recentProposalsMock];
    list.unshift(created);
    localStorage.setItem('tc_orcamentos_data', JSON.stringify(list));
  }

  return created;
}

export function getDefaultProposal() {
  return defaultProposalMock;
}

export function getUserData() {
  return userMock;
}

