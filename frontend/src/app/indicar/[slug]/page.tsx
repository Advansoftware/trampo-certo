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
    title: `Convite de ${name}: 30 dias grátis no TrampoCerto Pro`,
    description: `${name} te convidou para usar o TrampoCerto. São 30 dias grátis para mandar orçamento em PDF pelo WhatsApp e acompanhar o teto do MEI.`,
    openGraph: {
      title: `${name} te deu 30 dias grátis no TrampoCerto Pro`,
      description: 'Orçamento em PDF pelo WhatsApp e controle do teto do MEI.',
    },
  };
}

export default async function ReferralPage({ params }: PageProps) {
  const { slug } = await params;
  const referrerName = formatReferrerName(slug);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      <ReferralNavbar />
      <ReferralHero referrerName={referrerName} slug={slug} />
      <ReferralBenefits referrerName={referrerName} />

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
        <Typography sx={{ fontSize: '0.8125rem', color: '#74777F' }}>
          © {new Date().getFullYear()} TrampoCerto. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
