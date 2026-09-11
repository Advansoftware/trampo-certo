'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppButton from '@/components/common/AppButton';

export interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  ocupacao: string;
  cnpj: string;
  telefone: string;
  cidade: string;
  chavePix: string;
}

interface CadastroCardProps {
  loading: boolean;
  erro: string | null;
  onSubmit: (dados: DadosCadastro) => void;
  onVoltarLogin: () => void;
}

const CAMPOS_PERFIL: Array<{ campo: keyof DadosCadastro; label: string; placeholder: string; metade: boolean }> = [
  { campo: 'ocupacao', label: 'Ocupação / Ramo', placeholder: 'Ex: Eletricista e reparos residenciais', metade: false },
  { campo: 'cnpj', label: 'CNPJ MEI', placeholder: '00.000.000/0001-00', metade: true },
  { campo: 'telefone', label: 'WhatsApp', placeholder: '(00) 00000-0000', metade: true },
  { campo: 'cidade', label: 'Cidade / UF', placeholder: 'São Paulo - SP', metade: true },
  { campo: 'chavePix', label: 'Chave Pix', placeholder: 'CNPJ, telefone ou e-mail', metade: true },
];

const VAZIO: DadosCadastro = {
  nome: '', email: '', senha: '', ocupacao: '', cnpj: '', telefone: '', cidade: '', chavePix: '',
};

/** Cadastro da conta MEI: credenciais + dados que aparecem nos documentos. */
export default function CadastroCard({ loading, erro, onSubmit, onVoltarLogin }: CadastroCardProps) {
  const [dados, setDados] = useState<DadosCadastro>(VAZIO);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroLocal, setErroLocal] = useState<string | null>(null);

  const alterar = (campo: keyof DadosCadastro) => (evento: React.ChangeEvent<HTMLInputElement>) =>
    setDados((atual) => ({ ...atual, [campo]: evento.target.value }));

  const enviar = (evento: React.FormEvent) => {
    evento.preventDefault();

    if (!dados.nome.trim() || !dados.email.trim()) {
      setErroLocal('Informe seu nome e e-mail.');
      return;
    }
    if (dados.senha.length < 8) {
      setErroLocal('A senha precisa ter ao menos 8 caracteres.');
      return;
    }

    setErroLocal(null);
    onSubmit(dados);
  };

  return (
    <Box
      component="form"
      onSubmit={enviar}
      sx={{
        width: '100%',
        bgcolor: '#FFFFFF',
        borderRadius: '28px',
        p: { xs: 3, sm: 4, lg: 5 },
        boxShadow: '0 4px 20px rgba(0, 32, 69, 0.05)',
        border: '1px solid rgba(226, 226, 233, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1B20', letterSpacing: '-0.02em' }}>
          Criar conta MEI
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#43474E', mt: 0.5 }}>
          Estes dados aparecem nos seus orçamentos e recibos — você pode ajustá-los depois.
        </Typography>
      </Box>

      {(erro || erroLocal) && (
        <Alert severity="error" sx={{ borderRadius: '14px' }}>
          {erro || erroLocal}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nome completo"
            value={dados.nome}
            onChange={alterar('nome')}
            required
            fullWidth
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="E-mail"
            type="email"
            value={dados.email}
            onChange={alterar('email')}
            required
            fullWidth
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Senha (mínimo 8 caracteres)"
            type={mostrarSenha ? 'text' : 'password'}
            value={dados.senha}
            onChange={alterar('senha')}
            required
            fullWidth
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setMostrarSenha((valor) => !valor)} edge="end" size="small">
                      {mostrarSenha ? (
                        <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        {CAMPOS_PERFIL.map((item) => (
          <Grid key={item.campo} size={{ xs: 12, sm: item.metade ? 6 : 12 }}>
            <TextField
              label={item.label}
              placeholder={item.placeholder}
              value={dados[item.campo]}
              onChange={alterar(item.campo)}
              fullWidth
              size="small"
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <AppButton
          variant="text"
          size="small"
          startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
          onClick={onVoltarLogin}
          type="button"
        >
          Já tenho conta
        </AppButton>

        <AppButton type="submit" size="large" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta e entrar'}
        </AppButton>
      </Box>
    </Box>
  );
}
