'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

const testimonials = [
  {
    name: 'Rodrigo Silva',
    role: 'Eletricista residencial',
    location: 'São Paulo, SP',
    avatar: '/rodrigo-avatar.jpg',
    comment:
      'Antes eu mandava o preço por áudio no WhatsApp e metade das pessoas não respondia. Agora eu monto o PDF em dois minutos enquanto estou na casa do cliente. O serviço fica com cara séria e o cliente aprova bem mais rápido.',
  },
  {
    name: 'Camila Rocha',
    role: 'Designer gráfica e freelancer',
    location: 'Belo Horizonte, MG',
    avatar: '',
    comment:
      'Eu tinha pavor de passar do teto do MEI sem perceber. Ficava com medo de receber uma notificação da Receita Federal. O termômetro na tela me diz exatamente quanto posso faturar até o final do ano sem dor de cabeça.',
  },
  {
    name: 'Marcos Antunes',
    role: 'Marcenaria sob medida',
    location: 'Curitiba, PR',
    avatar: '',
    comment:
      'Gostei porque já coloca a condição de pagamento certinha: 50% de entrada no Pix para comprar o material e o restante na entrega. O cliente vê tudo discriminado e não fica tentando pedir desconto sem sentido.',
  },
];

export default function LandingTestimonials() {
  return (
    <Box
      id="depoimentos"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#F3F3FA',
        borderTop: '1px solid rgba(226, 226, 233, 0.7)',
        borderBottom: '1px solid rgba(226, 226, 233, 0.7)',
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              color: '#002045',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              mb: 1.5,
            }}
          >
            Depoimentos de quem usa no dia a dia
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#002045',
              fontSize: { xs: '1.85rem', sm: '2.4rem' },
              letterSpacing: '-0.02em',
              maxWidth: 680,
              mx: 'auto',
            }}
          >
            Gente que vive de serviço e precisa de agilidade.
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          {testimonials.map((item, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: '24px',
                  p: { xs: 3, sm: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(226, 226, 233, 0.8)',
                  boxShadow: '0 4px 16px rgba(0, 32, 69, 0.04)',
                }}
              >
                <Typography
                  sx={{
                    color: '#43474E',
                    fontSize: '0.925rem',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    mb: 3,
                  }}
                >
                  &ldquo;{item.comment}&rdquo;
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {item.avatar ? (
                    <Avatar src={item.avatar} alt={item.name} sx={{ width: 46, height: 46 }} />
                  ) : (
                    <Avatar
                      sx={{
                        width: 46,
                        height: 46,
                        bgcolor: index === 1 ? '#002045' : '#C85A32',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}
                    >
                      {item.name.charAt(0)}
                    </Avatar>
                  )}

                  <Box>
                    <Typography sx={{ fontWeight: 700, color: '#002045', fontSize: '0.95rem' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: '#74777F', fontSize: '0.8rem' }}>
                      {item.role} • {item.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
