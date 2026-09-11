import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { getServerApiUrl } from '@/lib/runtime-config';
import './globals.css';

// Renderiza a cada requisição para que a URL da API abaixo venha do ambiente do
// servidor em runtime — um layout pré-renderizado congelaria o valor do build.
// O app é todo client-side, então não se perde ganho de geração estática.
export const dynamic = 'force-dynamic';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TrampoCerto - Gestor Financeiro MEI Autônomo',
  description: 'Controle de faturamento, termômetro MEI, orçamentos rápidos e emissão de recibos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        {/* Endereço público da API entregue ao navegador em runtime:
            trocar API_URL no Coolify não exige rebuild da imagem. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__TRAMPO_API_URL__=${JSON.stringify(getServerApiUrl())};`,
          }}
        />
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
