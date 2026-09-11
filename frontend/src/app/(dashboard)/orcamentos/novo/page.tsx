'use client';

import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import EditorOrcamento from '@/components/orcamentos/editor/EditorOrcamento';

/** `useSearchParams` exige uma fronteira de Suspense no App Router. */
export default function CriadorOrcamentoPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#1E3A8A' }} />
        </Box>
      }
    >
      <EditorOrcamento />
    </Suspense>
  );
}
