'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface CampoLoginProps {
  id: string;
  label: string;
  valor: string;
  onChange: (valor: string) => void;
  placeholder: string;
  icone: React.ReactNode;
  type?: string;
  /** Conteúdo à direita do label: dica curta ou link de ação. */
  acessorioLabel?: React.ReactNode;
  acessorioFinal?: React.ReactNode;
}

/** Campo do formulário de acesso, com a mesma moldura arredondada em todos os inputs. */
export default function CampoLogin({
  id,
  label,
  valor,
  onChange,
  placeholder,
  icone,
  type,
  acessorioLabel,
  acessorioFinal,
}: CampoLoginProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
        <Typography
          component="label"
          htmlFor={id}
          sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#43474E' }}
        >
          {label}
        </Typography>
        {acessorioLabel}
      </Box>

      <TextField
        fullWidth
        id={id}
        type={type}
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
        placeholder={placeholder}
        required
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">{icone}</InputAdornment>,
            endAdornment: acessorioFinal ? <InputAdornment position="end">{acessorioFinal}</InputAdornment> : undefined,
            sx: {
              bgcolor: '#F3F3FA',
              borderRadius: '16px',
              height: 54,
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'rgba(0, 32, 69, 0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#002045', borderWidth: 2 },
            },
          },
        }}
      />
    </Box>
  );
}
