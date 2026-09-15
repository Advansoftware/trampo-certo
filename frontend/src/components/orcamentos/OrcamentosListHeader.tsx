'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AppButton from '@/components/common/AppButton';
import CabecalhoPagina from '@/components/common/CabecalhoPagina';

interface OrcamentosListHeaderProps {
  totalCount?: number;
  onExport?: () => void;
}

export default function OrcamentosListHeader({ totalCount = 0, onExport }: OrcamentosListHeaderProps) {
  const router = useRouter();

  return (
    <CabecalhoPagina
      etiqueta="Suas propostas"
      iconeEtiqueta={<RequestQuoteIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
      resumo={totalCount === 1 ? '1 orçamento criado' : `${totalCount} orçamentos criados`}
      titulo="Orçamentos"
      descricao="Em que pé está cada proposta, com o link pronto para mandar no WhatsApp do cliente."
      acoes={
        <>
          {onExport && (
            <AppButton
              variant="surface"
              size="medium"
              startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
              onClick={onExport}
            >
              Exportar CSV
            </AppButton>
          )}

          <AppButton
            variant="primary"
            size="medium"
            startIcon={<AddIcon sx={{ fontSize: 19 }} />}
            onClick={() => router.push('/orcamentos/novo')}
          >
            Novo orçamento
          </AppButton>
        </>
      }
    />
  );
}
