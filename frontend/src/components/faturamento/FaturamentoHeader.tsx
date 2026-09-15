'use client';

import React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AppButton from '@/components/common/AppButton';
import CabecalhoPagina from '@/components/common/CabecalhoPagina';
import { formatMoeda } from '@/lib/format';

interface FaturamentoHeaderProps {
  limiteAnual: number;
  onExport: () => void;
  onPayDas: () => void;
}

export default function FaturamentoHeader({ limiteAnual, onExport, onPayDas }: FaturamentoHeaderProps) {
  return (
    <CabecalhoPagina
      etiqueta="Faturamento do ano"
      iconeEtiqueta={<AccountBalanceIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
      resumo={`Ano-calendário ${new Date().getFullYear()}`}
      corPonto="#166534"
      titulo="Faturamento e DAS"
      descricao={`Aqui você acompanha o teto de ${formatMoeda(
        limiteAnual,
      )}, paga a guia DAS do mês e gera o relatório de receitas brutas que o MEI precisa guardar.`}
      acoes={
        <>
          <AppButton
            variant="surface"
            size="medium"
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={onExport}
          >
            Exportar relatório
          </AppButton>

          <AppButton
            variant="primary"
            size="medium"
            startIcon={<QrCode2Icon sx={{ fontSize: 19 }} />}
            onClick={onPayDas}
          >
            Pagar DAS com Pix
          </AppButton>
        </>
      }
    />
  );
}
