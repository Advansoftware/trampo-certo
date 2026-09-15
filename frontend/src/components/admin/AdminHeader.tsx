'use client';

import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CabecalhoPagina from '@/components/common/CabecalhoPagina';

interface AdminHeaderProps {
  total: number;
  totalPro: number;
}

export default function AdminHeader({ total, totalPro }: AdminHeaderProps) {
  return (
    <CabecalhoPagina
      etiqueta="Administração"
      iconeEtiqueta={<AdminPanelSettingsIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
      resumo={total === 1 ? '1 conta no app' : `${total} contas no app`}
      corPonto="#7C3AED"
      titulo="Usuários"
      descricao={`Quem usa o TrampoCerto e em qual plano. ${
        totalPro === 1 ? '1 conta está' : `${totalPro} contas estão`
      } no Pro.`}
    />
  );
}
