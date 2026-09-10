'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '@/components/Logo';
import AppButton from '@/components/common/AppButton';
import { signOut } from '@/lib/auth-client';

const DRAWER_WIDTH = 288;

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'Orçamentos & Propostas', path: '/orcamentos/novo', icon: RequestQuoteIcon },
  { label: 'Recibos Emitidos', path: '/recibos', icon: ReceiptLongIcon },
  { label: 'Faturamento & DAS MEI', path: '/faturamento', icon: AccountBalanceIcon },
  { label: 'Clientes', path: '/clientes', icon: GroupIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {}
    router.push('/login');
  };

  const drawerContent = (
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
      {/* Top Sidebar: Logo + MEI Badge */}
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

        {/* Nav Links */}
        <List sx={{ mt: 2, p: 0 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            const IconComponent = item.icon;

            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.75 }}>
                <ListItemButton
                  onClick={() => {
                    router.push(item.path);
                    setMobileOpen(false);
                  }}
                  sx={{
                    borderRadius: '9999px',
                    py: 1.25,
                    px: 2,
                    bgcolor: isActive ? '#DBEAFE' : 'transparent',
                    color: isActive ? '#172554' : '#43474E',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: isActive ? '#DBEAFE' : '#F1F4F9',
                      color: isActive ? '#172554' : '#1A1B20',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: isActive ? '#1E3A8A' : '#74777F' }}>
                    <IconComponent sx={{ fontSize: 22 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.9rem',
                          fontWeight: isActive ? 700 : 500,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Sidebar: Mini Teto Gauge & System Info */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 2 }}>
        {/* Teto Card */}
        <Box
          sx={{
            bgcolor: '#F1F4F9',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            borderRadius: '20px',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#43474E' }}>
              Teto Anual MEI
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E3A8A' }}>
              52%
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: 8, bgcolor: '#DFE4EE', borderRadius: '9999px', overflow: 'hidden', mb: 1 }}>
            <Box sx={{ width: '52%', height: '100%', bgcolor: '#1E3A8A', borderRadius: '9999px' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#74777F' }}>
            <span>R$ 42.120</span>
            <span style={{ fontWeight: 600, color: '#1A1B20' }}>R$ 81.000</span>
          </Box>
        </Box>

        {/* Footer info & Logout */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
          <Typography sx={{ fontSize: '0.6875rem', color: '#74777F' }}>
            © 2025 TrampoCerto
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: '#1E3A8A', fontWeight: 700 }}>
            v2.4
          </Typography>
        </Box>

        <IconButton
          onClick={handleLogout}
          size="small"
          sx={{
            justifyContent: 'flex-start',
            borderRadius: '9999px',
            px: 1,
            py: 0.5,
            color: '#74777F',
            fontSize: '0.75rem',
            '&:hover': { color: '#BA1A1A', bgcolor: 'rgba(186, 26, 26, 0.08)' },
          }}
        >
          <LogoutIcon sx={{ fontSize: 16, mr: 1 }} />
          <span>Sair da conta</span>
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F9FD' }}>
      {/* Sidebar Desktop */}
      <Box
        component="nav"
        sx={{
          width: { md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Permanent Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid rgba(196, 198, 207, 0.4)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Column */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar Header */}
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
          {/* Mobile menu trigger */}
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' }, mr: 1, color: '#1A1B20' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search bar */}
          <Box sx={{ maxWidth: 360, width: '100%', display: { xs: 'none', sm: 'block' } }}>
            <TextField
              placeholder="Buscar orçamento, cliente ou recibo..."
              size="small"
              fullWidth
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

          {/* Right actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
            <AppButton
              variant="primary"
              size="small"
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
              onClick={() => router.push('/orcamentos/novo')}
              sx={{ bgcolor: '#1E3A8A', '&:hover': { bgcolor: '#1D4ED8' } }}
            >
              Novo Orçamento
            </AppButton>

            {/* Notification button */}
            <IconButton
              size="small"
              sx={{
                bgcolor: '#F1F4F9',
                width: 40,
                height: 40,
                color: '#1A1B20',
                '&:hover': { bgcolor: '#E8EDF5' },
              }}
            >
              <Badge
                variant="dot"
                sx={{
                  '& .MuiBadge-dot': {
                    bgcolor: '#D97706',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                  },
                }}
              >
                <NotificationsNoneIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>

            {/* User Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, pl: 1 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', lg: 'block' } }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1B20', lineHeight: 1.2 }}>
                  Rodrigo Silva (MEI)
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
                  <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#1E3A8A', display: 'inline-block' }} />
                  Regular
                </Typography>
              </Box>

              <Avatar
                src="/rodrigo-avatar.jpg"
                alt="Rodrigo Silva"
                sx={{
                  width: 38,
                  height: 38,
                  border: '2px solid #DBEAFE',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Page Content */}
        <Box component="main" sx={{ p: { xs: 2, sm: 3, md: 4 }, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
