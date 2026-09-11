'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { iniciais } from '@/lib/format';
import { Cliente } from '@/types';

interface SeletorClienteProps {
  clientes: Cliente[];
  termo: string;
  onSelecionar: (cliente: Cliente) => void;
  onCadastrarNovo?: (nomeInicial: string) => void;
}

/** Lista suspensa da carteira de clientes, filtrada pelo que já foi digitado. */
export default function SeletorCliente({
  clientes,
  termo,
  onSelecionar,
  onCadastrarNovo,
}: SeletorClienteProps) {
  const encontrados = React.useMemo(() => {
    const busca = termo.trim().toLowerCase();
    if (!busca) return clientes.slice(0, 5);
    return clientes.filter((cliente) =>
      [cliente.nome, cliente.documento, cliente.telefone]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(busca)),
    );
  }, [clientes, termo]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        mt: 0.75,
        bgcolor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid rgba(196, 198, 207, 0.6)',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)',
        zIndex: 999,
        overflow: 'hidden',
        maxHeight: 300,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 1.25,
          px: 2,
          bgcolor: '#F8F9FD',
          borderBottom: '1px solid rgba(196, 198, 207, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#74777F', textTransform: 'uppercase' }}>
          Clientes cadastrados ({encontrados.length})
        </Typography>
        {onCadastrarNovo && (
          <Typography
            onClick={() => onCadastrarNovo(termo)}
            sx={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#1E3A8A',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            + Cadastrar novo
          </Typography>
        )}
      </Box>

      <Box sx={{ overflowY: 'auto', maxHeight: 200 }}>
        {encontrados.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '13px', color: '#74777F' }}>
              Nenhum cliente encontrado com esse nome.
            </Typography>
          </Box>
        ) : (
          encontrados.map((cliente) => {
            const pj = cliente.tipo === 'PJ';
            return (
              <Box
                key={cliente.id}
                onClick={() => onSelecionar(cliente)}
                sx={{
                  p: 1.25,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  borderBottom: '1px solid rgba(196, 198, 207, 0.2)',
                  '&:hover': { bgcolor: '#F1F4F9' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      bgcolor: pj ? '#E0E7FF' : '#DBEAFE',
                      color: pj ? '#3730A3' : '#1E3A8A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                    }}
                  >
                    {iniciais(cliente.nome)}
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#1A1B20' }}>
                        {cliente.nome}
                      </Typography>
                      <Box
                        sx={{
                          px: 0.75,
                          py: 0.1,
                          borderRadius: '4px',
                          bgcolor: pj ? '#EEF2FF' : '#F1F4F9',
                          color: pj ? '#3730A3' : '#74777F',
                          fontSize: '9px',
                          fontWeight: 700,
                        }}
                      >
                        {cliente.tipo}
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: '11px', color: '#74777F' }}>
                      {cliente.telefone || 'Sem telefone'}
                      {cliente.cidade ? ` • ${cliente.cidade}` : ''}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '11px', color: '#1E3A8A', fontWeight: 600 }}>Selecionar</Typography>
              </Box>
            );
          })
        )}
      </Box>

      {onCadastrarNovo && (
        <Box
          onClick={() => onCadastrarNovo(termo)}
          sx={{
            p: 1.5,
            px: 2,
            bgcolor: '#EFF6FF',
            borderTop: '1px solid #BFDBFE',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#1E3A8A',
            fontWeight: 700,
            fontSize: '13px',
            transition: 'background-color 0.15s ease',
            '&:hover': { bgcolor: '#DBEAFE' },
          }}
        >
          <PersonAddIcon sx={{ fontSize: 18 }} />
          <span>
            {termo.trim() ? `Cadastrar "${termo.trim()}" como novo cliente` : 'Cadastrar novo cliente agora'}
          </span>
        </Box>
      )}
    </Box>
  );
}
