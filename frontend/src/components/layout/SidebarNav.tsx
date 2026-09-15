'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '@/components/Logo';
import { MeiMetrics } from '@/types';
import { NAV_ITEMS, NAV_ITEM_ADMIN } from './navItems';
import TetoMeiCard from './TetoMeiCard';

interface SidebarNavProps {
  metrics: MeiMetrics | null;
  /** Acrescenta o item de administração ao menu. */
  admin?: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
}

export default function SidebarNav({ metrics, admin = false, onNavigate, onLogout }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const itens = admin ? [...NAV_ITEMS, NAV_ITEM_ADMIN] : NAV_ITEMS;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#FFFFFF',
        p: 2.5,
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2.5,
            borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          }}
        >
          <Logo height={34} />
          <Box
            sx={{
              px: 1.5,
              py: 0.25,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            MEI
          </Box>
        </Box>

        <List sx={{ mt: 2, p: 0 }}>
          {itens.map((item) => {
            const ativo = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            const Icone = item.icon;

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.75 }}>
                <ListItemButton
                  onClick={() => {
                    router.push(item.path);
                    onNavigate?.();
                  }}
                  sx={{
                    borderRadius: '9999px',
                    py: 1.25,
                    px: 2,
                    bgcolor: ativo ? '#DBEAFE' : 'transparent',
                    color: ativo ? '#172554' : '#43474E',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: ativo ? '#DBEAFE' : '#F1F4F9',
                      color: ativo ? '#172554' : '#1A1B20',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: ativo ? '#1E3A8A' : '#74777F' }}>
                    <Icone sx={{ fontSize: 22 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{ primary: { sx: { fontSize: '0.9rem', fontWeight: ativo ? 700 : 500 } } }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 2 }}>
        <TetoMeiCard metrics={metrics} />

        <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', px: 0.5 }}>
          © {new Date().getFullYear()} TrampoCerto
        </Typography>

        <Button
          onClick={onLogout}
          size="small"
          startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            borderRadius: '9999px',
            px: 1.5,
            py: 0.75,
            color: '#74777F',
            fontSize: '0.75rem',
            fontWeight: 600,
            '&:hover': { color: '#BA1A1A', bgcolor: 'rgba(186, 26, 26, 0.08)' },
          }}
        >
          Sair da conta
        </Button>
      </Box>
    </Box>
  );
}
