'use client';

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppButton from '@/components/common/AppButton';
import CabecalhoPagina from '@/components/common/CabecalhoPagina';

interface RecibosHeaderProps {
  totalCount: number;
  onNewRecibo: () => void;
  onExport: () => void;
}

export default function RecibosHeader({ totalCount, onNewRecibo, onExport }: RecibosHeaderProps) {
  return (
    <CabecalhoPagina
      etiqueta="Comprovantes"
      iconeEtiqueta={<ReceiptLongIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
      resumo={totalCount === 1 ? '1 recibo emitido' : `${totalCount} recibos emitidos`}
      corPonto="#166534"
      titulo="Recibos"
      descricao="Comprovante de pagamento com termo de quitação e código de autenticação, pronto para mandar no WhatsApp."
      acoes={
        <>
          <AppButton
            variant="surface"
            size="medium"
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={onExport}
          >
            Exportar CSV
          </AppButton>

          <AppButton
            variant="primary"
            size="medium"
            startIcon={<AddIcon sx={{ fontSize: 19 }} />}
            onClick={onNewRecibo}
          >
            Emitir recibo
          </AppButton>
        </>
      }
    />
  );
}
