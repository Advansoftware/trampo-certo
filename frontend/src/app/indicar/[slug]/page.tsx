import React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReferralNavbar from '@/components/referral/ReferralNavbar';
import ReferralHero from '@/components/referral/ReferralHero';
import ReferralBenefits from '@/components/referral/ReferralBenefits';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatReferrerName(slug: string): string {
  if (!slug) return 'Seu Amigo';
  // Remove sufixos numéricos como -78, -123
  const clean = slug.replace(/-\d+$/, '').replace(/[_-]/g, ' ');
  return clean
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = formatReferrerName(slug);

  return {
    title: `Convite de ${name} • Ganhe 30 Dias Grátis no TrampoCerto Pro`,
    description: `${name} te convidou para profissionalizar seus orçamentos e gerenciar seus trampos como MEI. Ative 30 dias grátis sem burocracia.`,
    openGraph: {
      title: `${name} te deu 30 dias grátis no TrampoCerto Pro!`,
      description: 'Emita orçamentos em PDF com cara de grande empresa e controle seu limite MEI.',
    },
  };
}

export default async function ReferralPage({ params }: PageProps) {
  const { slug } = await params;
  const referrerName = formatReferrerName(slug);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Dedicated Referral Navbar */}
      <ReferralNavbar />

      {/* 2. Hero with Personalized Inviter Card and Quick Signup */}
      <ReferralHero referrerName={referrerName} slug={slug} />

      {/* 3. Unlocked Pro Features, Mechanics and Real Testimonials */}
      <ReferralBenefits referrerName={referrerName} />

      {/* 4. Minimal Public Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          px: 3,
          borderTop: '1px solid rgba(196, 198, 207, 0.3)',
          bgcolor: '#FFFFFF',
          textAlign: 'center',
          fontSize: '0.8125rem',
          color: '#74777F',
        }}
      >
        <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mb: 0.5 }}>
          © 2026 TrampoCerto Soluções Digitais MEI • Todos os direitos reservados.
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#A0A3AD' }}>
          Plataforma desenvolvida segundo as diretrizes do Material You (M3) e foco em autônomos brasileiros.
        </Typography>
      </Box>
    </Box>
  );
}
