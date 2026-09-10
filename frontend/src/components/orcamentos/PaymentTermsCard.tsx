'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface PaymentTermsCardProps {
  condicoesPagamento: string;
  validadeDias: number;
  observacoes: string;
  onChangeCondicoes: (val: string) => void;
  onChangeValidade: (val: number) => void;
  onChangeObservacoes: (val: string) => void;
}

export default function PaymentTermsCard({
  condicoesPagamento,
  validadeDias,
  observacoes,
  onChangeCondicoes,
  onChangeValidade,
  onChangeObservacoes,
}: PaymentTermsCardProps) {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
        3. Condições Comerciais, Prazos & Garantia
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            Condições de Pagamento
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={condicoesPagamento}
            onChange={(e) => onChangeCondicoes(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            Validade da Proposta (dias)
          </Typography>
          <TextField
            type="number"
            fullWidth
            size="small"
            value={validadeDias}
            onChange={(e) => onChangeValidade(Number(e.target.value))}
          />
        </Grid>

        <Grid size={12}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            Termos de Garantia e Observações
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            size="small"
            value={observacoes}
            onChange={(e) => onChangeObservacoes(e.target.value)}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
