'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import AppButton from '@/components/common/AppButton';
import { Cliente } from '@/types';
import CardCabecalho from './CardCabecalho';
import SeletorCliente from './SeletorCliente';
import { ESTILO_CARD, ESTILO_ROTULO, estiloInput, focoInput } from './camposEstilo';

interface CardClienteProps {
  editando: boolean;
  bloqueado: boolean;
  clientes: Cliente[];
  nome: string;
  telefone: string;
  localizacao: string;
  onNomeChange: (valor: string) => void;
  onTelefoneChange: (valor: string) => void;
  onLocalizacaoChange: (valor: string) => void;
  onSelecionarCliente: (cliente: Cliente) => void;
  onCadastrarNovoCliente?: (nomeInicial: string) => void;
}

/** Passo 1: identificação do cliente, com busca na carteira. */
export default function CardCliente({
  editando,
  bloqueado,
  clientes,
  nome,
  telefone,
  localizacao,
  onNomeChange,
  onTelefoneChange,
  onLocalizacaoChange,
  onSelecionarCliente,
  onCadastrarNovoCliente,
}: CardClienteProps) {
  const [listaAberta, setListaAberta] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Fecha a lista ao clicar fora do campo.
  React.useEffect(() => {
    function aoClicarFora(evento: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(evento.target as Node)) {
        setListaAberta(false);
      }
    }
    document.addEventListener('mousedown', aoClicarFora);
    return () => document.removeEventListener('mousedown', aoClicarFora);
  }, []);

  const somenteLeitura = editando || bloqueado;

  return (
    <Box sx={ESTILO_CARD}>
      <CardCabecalho
        icone={<PersonIcon sx={{ fontSize: 18 }} />}
        titulo="1. Dados do cliente"
        acao={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {editando ? (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 1.5,
                  py: 0.35,
                  borderRadius: '9999px',
                  bgcolor: '#EFF6FF',
                  color: '#1E3A8A',
                  border: '1px solid #BFDBFE',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                <LockIcon sx={{ fontSize: 13 }} />
                Cliente vinculado
              </Box>
            ) : (
              onCadastrarNovoCliente && (
                <AppButton
                  variant="surface"
                  size="xsmall"
                  disabled={bloqueado}
                  startIcon={<PersonAddIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
                  onClick={() => onCadastrarNovoCliente('')}
                  sx={{
                    bgcolor: '#EFF6FF',
                    color: '#1E3A8A',
                    borderColor: '#BFDBFE',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    '&:hover': { bgcolor: '#DBEAFE' },
                  }}
                >
                  + Novo cliente
                </AppButton>
              )
            )}
            <Box
              sx={{
                px: 1.5,
                py: 0.25,
                borderRadius: '9999px',
                bgcolor: 'rgba(219, 234, 254, 0.7)',
                border: '1px solid rgba(30, 58, 138, 0.2)',
                color: '#1E3A8A',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              Passo 1 de 3
            </Box>
          </Box>
        }
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
        <Box ref={containerRef} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={ESTILO_ROTULO}>Nome ou empresa do cliente</Typography>
            {!somenteLeitura && clientes.length > 0 && (
              <Typography
                onClick={() => setListaAberta((aberta) => !aberta)}
                sx={{ fontSize: '11px', color: '#1E3A8A', cursor: 'pointer', fontWeight: 600 }}
              >
                {listaAberta ? 'Ocultar clientes' : 'Selecionar da carteira'}
              </Typography>
            )}
          </Box>

          <Box sx={{ position: 'relative' }}>
            <input
              type="text"
              value={nome}
              readOnly={somenteLeitura}
              disabled={bloqueado}
              onChange={(evento) => {
                if (somenteLeitura) return;
                onNomeChange(evento.target.value);
                if (!listaAberta) setListaAberta(true);
              }}
              onFocus={() => {
                if (!somenteLeitura) setListaAberta(true);
              }}
              placeholder={editando ? 'Cliente vinculado' : 'Busque ou digite o nome do cliente...'}
              style={{
                ...estiloInput({ bloqueado: somenteLeitura, padding: '11px 40px 11px 16px' }),
                borderColor: listaAberta && !somenteLeitura ? '#1E3A8A' : undefined,
                fontWeight: editando ? 600 : 400,
              }}
            />
            {somenteLeitura ? (
              <LockIcon
                sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: 17 }}
              />
            ) : (
              <SearchIcon
                sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 18 }}
              />
            )}
          </Box>

          {editando && (
            <Typography
              sx={{ fontSize: '11px', color: '#64748B', mt: 0.25, display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <LockIcon sx={{ fontSize: 12, color: '#94A3B8' }} />
              Este orçamento está fixado a este cliente e não pode ser transferido.
            </Typography>
          )}

          {!somenteLeitura && listaAberta && (
            <SeletorCliente
              clientes={clientes}
              termo={nome}
              onSelecionar={(cliente) => {
                onSelecionarCliente(cliente);
                setListaAberta(false);
              }}
              onCadastrarNovo={
                onCadastrarNovoCliente
                  ? (nomeInicial) => {
                      setListaAberta(false);
                      onCadastrarNovoCliente(nomeInicial);
                    }
                  : undefined
              }
            />
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={ESTILO_ROTULO}>WhatsApp com DDD</Typography>
            <Box sx={{ position: 'relative' }}>
              <ChatIcon
                sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 17 }}
              />
              <input
                type="text"
                value={telefone}
                disabled={bloqueado}
                readOnly={bloqueado}
                onChange={(evento) => onTelefoneChange(evento.target.value)}
                placeholder="(00) 00000-0000"
                style={estiloInput({ bloqueado, padding: '11px 16px 11px 38px' })}
                {...focoInput(bloqueado)}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={ESTILO_ROTULO}>Cidade / bairro</Typography>
            <Box sx={{ position: 'relative' }}>
              <LocationOnIcon
                sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 17 }}
              />
              <input
                type="text"
                value={localizacao}
                disabled={bloqueado}
                readOnly={bloqueado}
                onChange={(evento) => onLocalizacaoChange(evento.target.value)}
                placeholder="Cidade - UF"
                style={estiloInput({ bloqueado, padding: '11px 16px 11px 38px' })}
                {...focoInput(bloqueado)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
