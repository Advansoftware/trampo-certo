'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import AdminHeader from '@/components/admin/AdminHeader';
import UsuariosTable from '@/components/admin/UsuariosTable';
import ConfirmarExclusaoDialog from '@/components/admin/ConfirmarExclusaoDialog';
import EstadoCarregamento from '@/components/common/EstadoCarregamento';
import EstadoVazio from '@/components/common/EstadoVazio';
import Toast from '@/components/common/Toast';
import { usePerfilMei } from '@/components/providers/PerfilProvider';
import { useAdminUsuarios } from '@/hooks/useAdminUsuarios';
import { useToast } from '@/hooks/useToast';
import { Plano, UsuarioAdmin } from '@/types';

export default function AdminPage() {
  const router = useRouter();
  const perfil = usePerfilMei();
  const ehAdmin = perfil?.admin === true;

  const { usuarios, loading, error, reload, trocarPlano, trocarStatus, excluir } =
    useAdminUsuarios(ehAdmin);
  const { toast, showToast, showError, hideToast } = useToast();

  const [idEmProcessamento, setIdEmProcessamento] = useState<string | null>(null);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<UsuarioAdmin | null>(null);

  // O backend é quem barra de verdade; aqui só evitamos mostrar a tela vazia
  // para quem não é administrador.
  if (perfil && !ehAdmin) {
    return (
      <EstadoVazio
        titulo="Área restrita"
        descricao="Esta página é do administrador do app."
        acaoLabel="Voltar ao painel"
        onAcao={() => router.push('/dashboard')}
      />
    );
  }

  const executar = async (id: string, acao: () => Promise<unknown>, mensagem: string) => {
    setIdEmProcessamento(id);
    try {
      await acao();
      showToast(mensagem);
    } catch (erro) {
      showError(erro);
    } finally {
      setIdEmProcessamento(null);
    }
  };

  const aoTrocarPlano = (id: string, plano: Plano) =>
    void executar(
      id,
      () => trocarPlano(id, plano),
      plano === 'pro' ? 'Conta movida para o Pro.' : 'Conta movida para o gratuito.',
    );

  const aoAlternarBloqueio = (usuario: UsuarioAdmin) => {
    const novo = usuario.status === 'bloqueado' ? 'ativo' : 'bloqueado';
    void executar(
      usuario.id,
      () => trocarStatus(usuario.id, novo),
      novo === 'bloqueado' ? `${usuario.name} foi bloqueado.` : `${usuario.name} voltou a ter acesso.`,
    );
  };

  const confirmarExclusao = () => {
    if (!usuarioParaExcluir) return;
    const alvo = usuarioParaExcluir;
    setUsuarioParaExcluir(null);
    void executar(alvo.id, () => excluir(alvo.id), `Conta de ${alvo.name} excluída.`);
  };

  const totalPro = usuarios.filter((usuario) => usuario.plano === 'pro').length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      <AdminHeader total={usuarios.length} totalPro={totalPro} />

      <EstadoCarregamento loading={loading} error={error} onRetry={reload} minHeight={320}>
        <UsuariosTable
          usuarios={usuarios}
          idEmProcessamento={idEmProcessamento}
          onTrocarPlano={aoTrocarPlano}
          onAlternarBloqueio={aoAlternarBloqueio}
          onExcluir={setUsuarioParaExcluir}
        />
      </EstadoCarregamento>

      <ConfirmarExclusaoDialog
        usuario={usuarioParaExcluir}
        excluindo={idEmProcessamento === usuarioParaExcluir?.id}
        onCancelar={() => setUsuarioParaExcluir(null)}
        onConfirmar={confirmarExclusao}
      />

      <Toast message={toast.message} severity={toast.severity} onClose={hideToast} />
    </Box>
  );
}
