'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { ResumoPlano } from '@/types';

interface CotaPlanoCardProps {
  resumo: ResumoPlano | null;
}

interface BarraCotaProps {
  rotulo: string;
  usados: number;
  limite: number;
}

function BarraCota({ rotulo, usados, limite }: BarraCotaProps) {
  const percentual = Math.min(100, (usados / limite) * 100);
  const esgotado = usados >= limite;

  return (
    <Box sx={{ flex: 1, minWidth: 180 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
        <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', fontWeight: 600 }}>{rotulo}</Typography>
        <Typography
          sx={{ fontSize: '0.8125rem', fontWeight: 800, color: esgotado ? '#B91C1C' : '#1A1B20' }}
        >
          {usados} de {limite}
        </Typography>
      </Box>

      <Box sx={{ width: '100%', height: 8, bgcolor: '#E8EDF5', borderRadius: '9999px', overflow: 'hidden' }}>
        <Box
          sx={{
            width: `${percentual}%`,
            height: '100%',
            borderRadius: '9999px',
            bgcolor: esgotado ? '#B91C1C' : percentual >= 70 ? '#D97706' : '#1E3A8A',
            transition: 'width 0.4s ease',
          }}
        />
      </Box>
    </Box>
  );
}

/**
 * Cota do mês no plano gratuito. Some quando a conta é Pro, que não tem limite.
 * Os números vêm de /api/planos/me, a mesma fonte que bloqueia a criação.
 */
export default function CotaPlanoCard({ resumo }: CotaPlanoCardProps) {
  if (!resumo || resumo.plano !== 'gratuito') return null;

  const { orcamentos, recibos } = resumo.limites;
  if (orcamentos === null && recibos === null) return null;

  const algumEsgotado =
    (orcamentos !== null && resumo.uso.orcamentos >= orcamentos) ||
    (recibos !== null && resumo.uso.recibos >= recibos);

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: `1px solid ${algumEsgotado ? '#FECACA' : 'rgba(196, 198, 207, 0.5)'}`,
        borderRadius: '24px',
        p: { xs: 2.5, sm: 3 },
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
        <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20, color: '#1E3A8A' }} />
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1B20' }}>
          Seu mês no plano gratuito
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 0.25,
            borderRadius: '9999px',
            bgcolor: '#F1F4F9',
            color: '#43474E',
            fontSize: '0.6875rem',
            fontWeight: 700,
          }}
        >
          Gratuito
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {orcamentos !== null && (
          <BarraCota rotulo="Orçamentos" usados={resumo.uso.orcamentos} limite={orcamentos} />
        )}
        {recibos !== null && <BarraCota rotulo="Recibos" usados={resumo.uso.recibos} limite={recibos} />}
      </Box>

      <Typography sx={{ fontSize: '0.75rem', color: algumEsgotado ? '#B91C1C' : '#74777F' }}>
        {algumEsgotado
          ? 'A cota deste mês acabou. Ela zera na virada do mês, ou o plano Pro tira o limite.'
          : 'A cota zera na virada do mês. No plano Pro não há limite.'}
      </Typography>
    </Box>
  );
}
