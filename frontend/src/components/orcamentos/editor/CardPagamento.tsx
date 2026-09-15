'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaymentsIcon from '@mui/icons-material/Payments';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EventIcon from '@mui/icons-material/Event';
import CardCabecalho from './CardCabecalho';
import { ESTILO_CARD, ESTILO_ROTULO, estiloInput, focoInput } from './camposEstilo';

interface CardPagamentoProps {
  bloqueado: boolean;
  condicoesPagamento: string;
  onCondicoesChange: (valor: string) => void;
  chavePix: string;
  onChavePixChange: (valor: string) => void;
  validade: string;
  onValidadeChange: (valor: string) => void;
  observacoes: string;
  onObservacoesChange: (valor: string) => void;
}

/**
 * Passo 3: condições comerciais.
 *
 * Todos os campos respeitam o bloqueio da proposta — antes eles continuavam
 * editáveis num orçamento aprovado e as alterações se perdiam ao salvar.
 */
export default function CardPagamento({
  bloqueado,
  condicoesPagamento,
  onCondicoesChange,
  chavePix,
  onChavePixChange,
  validade,
  onValidadeChange,
  observacoes,
  onObservacoesChange,
}: CardPagamentoProps) {
  return (
    <Box sx={ESTILO_CARD}>
      <CardCabecalho
        icone={<PaymentsIcon sx={{ fontSize: 18 }} />}
        titulo="3. Pagamento e garantia"
        acao={
          <Box
            sx={{
              px: 1.5,
              py: 0.25,
              borderRadius: '9999px',
              bgcolor: 'rgba(219, 234, 254, 0.7)',
              border: '1px solid rgba(30, 58, 138, 0.2)',
              color: '#1E3A8A',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Finalização
          </Box>
        }
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={ESTILO_ROTULO}>Condições de pagamento</Typography>
          <input
            type="text"
            value={condicoesPagamento}
            disabled={bloqueado}
            readOnly={bloqueado}
            onChange={(evento) => onCondicoesChange(evento.target.value)}
            placeholder="Ex: 50% de entrada no aceite + 50% na conclusão"
            style={estiloInput({ bloqueado })}
            {...focoInput(bloqueado)}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={ESTILO_ROTULO}>Chave PIX cadastrada</Typography>
            <Box sx={{ position: 'relative' }}>
              <QrCode2Icon
                sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#1E3A8A', fontSize: 18 }}
              />
              <input
                type="text"
                value={chavePix}
                disabled={bloqueado}
                readOnly={bloqueado}
                onChange={(evento) => onChavePixChange(evento.target.value)}
                placeholder="CNPJ, telefone ou e-mail da chave Pix"
                style={estiloInput({ bloqueado, padding: '11px 16px 11px 38px', fonte: '13px' })}
                {...focoInput(bloqueado)}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={ESTILO_ROTULO}>Validade da proposta</Typography>
            <Box sx={{ position: 'relative' }}>
              <EventIcon
                sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 17 }}
              />
              <input
                type="text"
                value={validade}
                disabled={bloqueado}
                readOnly={bloqueado}
                onChange={(evento) => onValidadeChange(evento.target.value)}
                placeholder="Ex: Válido por 10 dias"
                style={estiloInput({ bloqueado, padding: '11px 16px 11px 38px', fonte: '13px' })}
                {...focoInput(bloqueado)}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={ESTILO_ROTULO}>Termos de garantia & observações</Typography>
          <textarea
            rows={2}
            value={observacoes}
            disabled={bloqueado}
            readOnly={bloqueado}
            onChange={(evento) => onObservacoesChange(evento.target.value)}
            style={{ ...estiloInput({ bloqueado, fonte: '13px' }), resize: 'none', lineHeight: 1.5 }}
            {...focoInput(bloqueado)}
          />
        </Box>
      </Box>
    </Box>
  );
}
