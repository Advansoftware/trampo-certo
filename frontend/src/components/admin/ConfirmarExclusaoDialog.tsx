'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AppButton from '@/components/common/AppButton';
import { UsuarioAdmin } from '@/types';

interface ConfirmarExclusaoDialogProps {
  usuario: UsuarioAdmin | null;
  excluindo: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
}

/**
 * Exclusão é irreversível e leva junto os dados do usuário (CASCADE no banco),
 * por isso exige digitar o e-mail da conta antes de liberar o botão.
 */
export default function ConfirmarExclusaoDialog({
  usuario,
  excluindo,
  onCancelar,
  onConfirmar,
}: ConfirmarExclusaoDialogProps) {
  const [confirmacao, setConfirmacao] = useState('');

  const fechar = () => {
    setConfirmacao('');
    onCancelar();
  };

  const confirmar = () => {
    setConfirmacao('');
    onConfirmar();
  };

  const emailConfere = usuario ? confirmacao.trim().toLowerCase() === usuario.email.toLowerCase() : false;

  return (
    <Dialog
      open={Boolean(usuario)}
      onClose={fechar}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: '24px' } } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.25, pb: 1 }}>
        <WarningAmberIcon sx={{ color: '#B91C1C' }} />
        <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: '#1A1B20' }}>
          Excluir esta conta?
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Alert severity="error" sx={{ borderRadius: '14px' }}>
          Apaga também os {usuario?.totalOrcamentos ?? 0} orçamentos, {usuario?.totalRecibos ?? 0} recibos e{' '}
          {usuario?.totalClientes ?? 0} clientes de {usuario?.name}. Não dá para desfazer.
        </Alert>

        <Box>
          <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', mb: 1 }}>
            Digite <strong>{usuario?.email}</strong> para confirmar.
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={confirmacao}
            onChange={(evento) => setConfirmacao(evento.target.value)}
            placeholder="E-mail da conta"
            autoComplete="off"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 1 }}>
        <AppButton variant="surface" size="small" onClick={fechar}>
          Cancelar
        </AppButton>
        <AppButton
          variant="primary"
          size="small"
          disabled={!emailConfere || excluindo}
          onClick={confirmar}
          sx={{ bgcolor: '#B91C1C', '&:hover': { bgcolor: '#991B1B' } }}
        >
          {excluindo ? 'Excluindo...' : 'Excluir conta'}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
