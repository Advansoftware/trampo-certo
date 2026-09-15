'use client';

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EstadoVazio from '@/components/common/EstadoVazio';
import UsuarioLinhaAcoes from './UsuarioLinhaAcoes';
import { formatData, iniciais } from '@/lib/format';
import { Plano, UsuarioAdmin } from '@/types';

interface UsuariosTableProps {
  usuarios: UsuarioAdmin[];
  idEmProcessamento: string | null;
  onTrocarPlano: (id: string, plano: Plano) => void;
  onAlternarBloqueio: (usuario: UsuarioAdmin) => void;
  onExcluir: (usuario: UsuarioAdmin) => void;
}

const cabecalho = {
  fontSize: '0.6875rem',
  fontWeight: 700,
  color: '#74777F',
  textTransform: 'uppercase' as const,
  py: 1.5,
};

export default function UsuariosTable({
  usuarios,
  idEmProcessamento,
  onTrocarPlano,
  onAlternarBloqueio,
  onExcluir,
}: UsuariosTableProps) {
  const [busca, setBusca] = useState('');

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return usuarios;
    return usuarios.filter((usuario) =>
      [usuario.name, usuario.email, usuario.ocupacao, usuario.cidade]
        .join(' ')
        .toLowerCase()
        .includes(termo),
    );
  }, [usuarios, busca]);

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 2.5 }, borderBottom: '1px solid rgba(196, 198, 207, 0.4)' }}>
        <TextField
          placeholder="Buscar por nome, e-mail, ocupação ou cidade..."
          size="small"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          sx={{ maxWidth: 420, width: '100%' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#74777F', fontSize: 20 }} />
                </InputAdornment>
              ),
              sx: { bgcolor: '#F1F4F9', borderRadius: '9999px' },
            },
          }}
        />
      </Box>

      {filtrados.length === 0 ? (
        <EstadoVazio
          icone={<PersonSearchIcon sx={{ fontSize: 24 }} />}
          titulo={usuarios.length === 0 ? 'Nenhuma conta cadastrada' : 'Nenhuma conta para esta busca'}
          descricao={
            usuarios.length === 0
              ? 'As contas criadas no app aparecem aqui.'
              : 'Tente outro termo ou limpe a busca.'
          }
          acaoLabel={busca ? 'Limpar busca' : undefined}
          onAcao={busca ? () => setBusca('') : undefined}
        />
      ) : (
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 880 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F8F9FD' }}>
                <TableCell sx={{ ...cabecalho, pl: 3 }}>Usuário</TableCell>
                <TableCell sx={cabecalho}>Ocupação</TableCell>
                <TableCell sx={{ ...cabecalho, textAlign: 'center' }}>Uso</TableCell>
                <TableCell sx={{ ...cabecalho, textAlign: 'center' }}>Situação</TableCell>
                <TableCell sx={{ ...cabecalho, textAlign: 'right', pr: 3 }}>Plano e ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtrados.map((usuario) => {
                const bloqueado = usuario.status === 'bloqueado';

                return (
                  <TableRow key={usuario.id} hover sx={{ opacity: bloqueado ? 0.65 : 1 }}>
                    <TableCell sx={{ pl: 3, py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: '#DBEAFE',
                            color: '#1E3A8A',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                          }}
                        >
                          {iniciais(usuario.name)}
                        </Avatar>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20' }}>
                              {usuario.name}
                            </Typography>
                            {usuario.admin && (
                              <Box
                                sx={{
                                  px: 1,
                                  py: 0.15,
                                  borderRadius: '9999px',
                                  bgcolor: '#EDE9FE',
                                  color: '#5B21B6',
                                  fontSize: '0.625rem',
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                }}
                              >
                                Admin
                              </Box>
                            )}
                          </Box>
                          <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                            {usuario.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
                        {usuario.ocupacao || 'Não informada'}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                        {usuario.cidade || 'Cidade não informada'} • desde {formatData(usuario.criadoEm)}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2, textAlign: 'center' }}>
                      <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
                        {usuario.totalOrcamentos} orç. • {usuario.totalRecibos} rec.
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                        {usuario.totalClientes === 1 ? '1 cliente' : `${usuario.totalClientes} clientes`}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.35,
                          borderRadius: '9999px',
                          bgcolor: bloqueado ? '#FEE2E2' : '#DCFCE7',
                          color: bloqueado ? '#991B1B' : '#166534',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                        }}
                      >
                        {bloqueado ? 'Bloqueado' : 'Ativo'}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ py: 2, pr: 3 }}>
                      <UsuarioLinhaAcoes
                        usuario={usuario}
                        ocupado={idEmProcessamento === usuario.id}
                        onTrocarPlano={(plano) => onTrocarPlano(usuario.id, plano)}
                        onAlternarBloqueio={() => onAlternarBloqueio(usuario)}
                        onExcluir={() => onExcluir(usuario)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
