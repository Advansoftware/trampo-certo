'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

interface ClientFormData {
  clienteNome: string;
  clienteTelefone: string;
  clienteDocumento: string;
  clienteEmail: string;
}

interface ClientFormCardProps {
  data: ClientFormData;
  onChange: (field: keyof ClientFormData, value: string) => void;
}

export default function ClientFormCard({ data, onChange }: ClientFormCardProps) {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
        1. Dados do Cliente
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            Nome do Cliente / Empresa *
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={data.clienteNome}
            onChange={(e) => onChange('clienteNome', e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlinedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            WhatsApp para envio *
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={data.clienteTelefone}
            onChange={(e) => onChange('clienteTelefone', e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            CPF ou CNPJ (opcional)
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={data.clienteDocumento}
            onChange={(e) => onChange('clienteDocumento', e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            E-mail do Cliente
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={data.clienteEmail}
            onChange={(e) => onChange('clienteEmail', e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
