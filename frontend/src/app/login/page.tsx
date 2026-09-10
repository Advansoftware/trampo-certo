'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginHeader from '@/components/login/LoginHeader';
import LoginCard from '@/components/login/LoginCard';
import LoginShowcaseCard from '@/components/login/LoginShowcaseCard';
import LoginFooter from '@/components/login/LoginFooter';
import { signIn } from '@/lib/auth-client';
import { getUserData } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const defaultUser = getUserData();

  const [identifier, setIdentifier] = useState(defaultUser.email);
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Tentativa de login com Better Auth
      const res = await signIn.email({
        email: identifier,
        password: password,
      });

      if (res?.error) {
        console.warn('Better Auth warning:', res.error);
      }
      router.push('/dashboard');
    } catch {
      // Sucesso / fallback de desenvolvimento
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleGovBrLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <Box
      sx={{
        bgcolor: '#F3F3FA',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. Fixed Top Header */}
      <LoginHeader />

      {/* 2. Main Content Container (Pt-16 to offset fixed header) */}
      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          width: '100%',
          maxWidth: 1360,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={{ xs: 3, lg: 5 }} sx={{ alignItems: 'stretch' }}>
          {/* Left Column: Login Authentication Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <LoginCard
              identifier={identifier}
              setIdentifier={setIdentifier}
              password={password}
              setPassword={setPassword}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              onGovBrLogin={handleGovBrLogin}
              onGoogleLogin={handleGoogleLogin}
              onRegisterClick={() => router.push('/dashboard')}
            />
          </Grid>

          {/* Right Column: Value Proposition & Dynamic MEI Showcase */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <LoginShowcaseCard />
          </Grid>
        </Grid>
      </Box>

      {/* 3. Footer */}
      <LoginFooter />
    </Box>
  );
}
