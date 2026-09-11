'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import { PerfilMei } from '@/types';

interface TopbarProps {
  perfil: PerfilMei | null;
  busca: string;
  onBuscaChange: (valor: string) => void;
  onAbrirMenu: () => void;
}

export default function Topbar({ perfil, busca, onBuscaChange, onAbrirMenu }: TopbarProps) {
  return (
    <Box
      component="header"
      sx={{
        height: 76,
        bgcolor: 'rgba(248, 249, 253, 0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
        px: { xs: 2, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <IconButton onClick={onAbrirMenu} sx={{ display: { md: 'none' }, mr: 1, color: '#1A1B20' }}>
        <MenuIcon />
      </IconButton>

      <Box sx={{ maxWidth: 360, width: '100%', display: { xs: 'none', sm: 'block' } }}>
        <TextField
          placeholder="Buscar orçamento, cliente ou recibo..."
          size="small"
          fullWidth
          value={busca}
          onChange={(evento) => onBuscaChange(evento.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#74777F', fontSize: 20 }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: '#F1F4F9',
                borderRadius: '9999px',
                height: 42,
                fontSize: '0.85rem',
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#1E3A8A' },
              },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
        <IconButton
          size="small"
          sx={{ bgcolor: '#F1F4F9', width: 40, height: 40, color: '#1A1B20', '&:hover': { bgcolor: '#E8EDF5' } }}
        >
          <Badge
            variant="dot"
            sx={{ '& .MuiBadge-dot': { bgcolor: '#D97706', width: 8, height: 8, borderRadius: '50%' } }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, pl: 1 }}>
          <Box sx={{ textAlign: 'right', display: { xs: 'none', lg: 'block' } }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1B20', lineHeight: 1.2 }}>
              {perfil ? `${perfil.name} (MEI)` : 'Carregando...'}
            </Typography>
            <Typography
              component="div"
              sx={{
                fontSize: '0.7rem',
                color: '#1E3A8A',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 0.5,
              }}
            >
              <Box
                component="span"
                sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#1E3A8A', display: 'inline-block' }}
              />
              {perfil?.ocupacao || 'Perfil MEI'}
            </Typography>
          </Box>

          <Avatar
            src={perfil?.image || undefined}
            alt={perfil?.name || 'Perfil'}
            sx={{ width: 38, height: 38, border: '2px solid #DBEAFE', bgcolor: '#DBEAFE', color: '#1E3A8A', fontWeight: 700, fontSize: '0.9rem' }}
          >
            {perfil?.avatarInitials}
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
