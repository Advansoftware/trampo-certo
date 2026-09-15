'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CircularProgress from '@mui/material/CircularProgress';
import SidebarNav from '@/components/layout/SidebarNav';
import Topbar from '@/components/layout/Topbar';
import { DRAWER_WIDTH } from '@/components/layout/navItems';
import { PerfilProvider } from '@/components/providers/PerfilProvider';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useMeiMetrics } from '@/hooks/useMei';
import { usePerfil } from '@/hooks/usePerfil';
import { signOut } from '@/lib/auth-client';

/**
 * Casca da área logada.
 *
 * Sem sessão do Better Auth, nada é renderizado: o guard redireciona para
 * /login. Com sessão, o perfil MEI fica disponível via contexto para os
 * documentos e o cabeçalho.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { carregando, autenticado } = useAuthGuard();
  // Só busca depois que a sessão foi confirmada, para não disparar 401 na saída.
  const { perfil } = usePerfil(autenticado);
  const { metrics } = useMeiMetrics(undefined, autenticado);

  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const sair = async () => {
    try {
      await signOut();
    } finally {
      router.replace('/login');
    }
  };

  if (carregando || !autenticado) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F8F9FD' }}>
        <CircularProgress sx={{ color: '#1E3A8A' }} />
      </Box>
    );
  }

  const sidebar = (
    <SidebarNav
      metrics={metrics}
      admin={perfil?.admin === true}
      onNavigate={() => setMenuMobileAberto(false)}
      onLogout={() => void sair()}
    />
  );

  return (
    <PerfilProvider perfil={perfil}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F9FD' }}>
        <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
          <Drawer
            variant="temporary"
            open={menuMobileAberto}
            onClose={() => setMenuMobileAberto(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
            }}
          >
            {sidebar}
          </Drawer>

          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                borderRight: '1px solid rgba(196, 198, 207, 0.4)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              },
            }}
          >
            {sidebar}
          </Drawer>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Topbar perfil={perfil} onAbrirMenu={() => setMenuMobileAberto(true)} />

          <Box component="main" sx={{ p: { xs: 2, sm: 3, md: 4 }, flexGrow: 1 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </PerfilProvider>
  );
}
