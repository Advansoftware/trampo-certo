'use client';

import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import CartaoMetrica from '@/components/common/CartaoMetrica';
import { formatMoeda } from '@/lib/format';
import { Cliente } from '@/types';

interface ClientesMetricsProps {
  clientes: Cliente[];
}

export default function ClientesMetrics({ clientes }: ClientesMetricsProps) {
  const metricas = useMemo(() => {
    const total = clientes.length;
    const empresas = clientes.filter((cliente) => (cliente.tipo || '').toUpperCase() === 'PJ').length;
    const pessoas = total - empresas;

    const faturamentoTotal = clientes.reduce((soma, cliente) => soma + (Number(cliente.totalFaturado) || 0), 0);
    const ticketMedio = total > 0 ? faturamentoTotal / total : 0;

    const maiorCliente = clientes.reduce<Cliente | null>((maior, cliente) => {
      const valor = Number(cliente.totalFaturado) || 0;
      return valor > (Number(maior?.totalFaturado) || 0) ? cliente : maior;
    }, null);

    return { total, empresas, pessoas, faturamentoTotal, ticketMedio, maiorCliente };
  }, [clientes]);

  const percentualEmpresas =
    metricas.total > 0 ? Math.round((metricas.empresas / metricas.total) * 100) : 0;

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Clientes na carteira"
          valor={String(metricas.total)}
          detalhe={metricas.total === 1 ? '1 cliente cadastrado' : `${metricas.total} clientes cadastrados`}
          icone={<PeopleIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DBEAFE"
          corIcone="#1E3A8A"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Pessoa física e empresa"
          valor={`${metricas.empresas} PJ • ${metricas.pessoas} PF`}
          detalhe={`${percentualEmpresas}% da carteira são empresas`}
          icone={<BusinessIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#E0E7FF"
          corIcone="#3730A3"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Média por cliente"
          valor={formatMoeda(metricas.ticketMedio)}
          detalhe={`${formatMoeda(metricas.faturamentoTotal)} somando todos`}
          icone={<TrendingUpIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DCFCE7"
          corIcone="#15803D"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Cliente que mais rendeu"
          valor={metricas.maiorCliente ? metricas.maiorCliente.nome.split(' ')[0] : 'Nenhum ainda'}
          detalhe={
            metricas.maiorCliente
              ? `${formatMoeda(Number(metricas.maiorCliente.totalFaturado) || 0)} faturados`
              : 'Nenhum serviço registrado'
          }
          icone={<StarIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#FEF3C7"
          corIcone="#B45309"
          selo={
            metricas.maiorCliente?.tipo
              ? { texto: metricas.maiorCliente.tipo, bgcolor: '#FEF3C7', color: '#92400E' }
              : undefined
          }
        />
      </Grid>
    </Grid>
  );
}
