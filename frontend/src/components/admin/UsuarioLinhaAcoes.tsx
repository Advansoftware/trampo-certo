'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { Plano, UsuarioAdmin } from '@/types';

interface UsuarioLinhaAcoesProps {
  usuario: UsuarioAdmin;
  ocupado: boolean;
  onTrocarPlano: (plano: Plano) => void;
  onAlternarBloqueio: () => void;
  onExcluir: () => void;
}

/** Seletor de plano e ações destrutivas de uma linha da tabela. */
export default function UsuarioLinhaAcoes({
  usuario,
  ocupado,
  onTrocarPlano,
  onAlternarBloqueio,
  onExcluir,
}: UsuarioLinhaAcoesProps) {
  const bloqueado = usuario.status === 'bloqueado';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
      <Select
        size="small"
        value={usuario.plano}
        disabled={ocupado}
        onChange={(evento) => onTrocarPlano(evento.target.value as Plano)}
        sx={{ minWidth: 116, borderRadius: '9999px', fontSize: '0.8125rem', bgcolor: '#F1F4F9' }}
      >
        <MenuItem value="gratuito">Gratuito</MenuItem>
        <MenuItem value="pro">Pro</MenuItem>
      </Select>

      <Tooltip title={usuario.admin ? 'A conta do administrador não pode ser bloqueada' : bloqueado ? 'Desbloquear' : 'Bloquear'}>
        <span>
          <IconButton
            size="small"
            disabled={ocupado || usuario.admin}
            onClick={onAlternarBloqueio}
            sx={{ color: bloqueado ? '#166534' : '#D97706' }}
          >
            {bloqueado ? <LockOpenIcon sx={{ fontSize: 19 }} /> : <BlockIcon sx={{ fontSize: 19 }} />}
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={usuario.admin ? 'A conta do administrador não pode ser excluída' : 'Excluir conta'}>
        <span>
          <IconButton
            size="small"
            disabled={ocupado || usuario.admin}
            onClick={onExcluir}
            sx={{ color: '#B91C1C' }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
