'use client';

import React from 'react';
import Box from '@mui/material/Box';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingPains from '@/components/landing/LandingPains';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingFooter from '@/components/landing/LandingFooter';

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: '#F9F9FF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar />
      <LandingHero />
      <LandingPains />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingPricing />
      <LandingFooter />
    </Box>
  );
}
