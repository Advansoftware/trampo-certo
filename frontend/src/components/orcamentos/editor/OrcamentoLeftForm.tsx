'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Cliente } from '@/types';
import { OrcamentoPreviewItem } from '../OrcamentoA4Preview';
import CardCliente from './CardCliente';
import CardItens from './CardItens';
import CardPagamento from './CardPagamento';
import { ESTILO_CARD } from './camposEstilo';

interface OrcamentoLeftFormProps {
  codigo: string;
  editando: boolean;
  bloqueado: boolean;
  clientes: Cliente[];
  cliente: {
    nome: string;
    telefone: string;
    localizacao: string;
    setNome: (valor: string) => void;
    setTelefone: (valor: string) => void;
    setLocalizacao: (valor: string) => void;
    selecionar: (cliente: Cliente) => void;
  };
  onCadastrarNovoCliente: (nomeInicial: string) => void;
  itens: OrcamentoPreviewItem[];
  onAdicionarItem: () => void;
  onRemoverItem: (id: string) => void;
  onAlterarItem: (id: string, campo: keyof OrcamentoPreviewItem, valor: string | number) => void;
  subtotal: number;
  desconto: number;
  onDescontoChange: (valor: number) => void;
  total: number;
  condicoesPagamento: string;
  onCondicoesChange: (valor: string) => void;
  chavePix: string;
  onChavePixChange: (valor: string) => void;
  validade: string;
  onValidadeChange: (valor: string) => void;
  observacoes: string;
  onObservacoesChange: (valor: string) => void;
}

/** Coluna esquerda do editor: os três cards do formulário em sequência. */
export default function OrcamentoLeftForm({
  codigo,
  editando,
  bloqueado,
  clientes,
  cliente,
  onCadastrarNovoCliente,
  itens,
  onAdicionarItem,
  onRemoverItem,
  onAlterarItem,
  subtotal,
  desconto,
  onDescontoChange,
  total,
  condicoesPagamento,
  onCondicoesChange,
  chavePix,
  onChavePixChange,
  validade,
  onValidadeChange,
  observacoes,
  onObservacoesChange,
}: OrcamentoLeftFormProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ ...ESTILO_CARD, gap: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#1E3A8A',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 700,
          }}
        >
          <EditDocumentIcon sx={{ fontSize: 16 }} />
          <span>Orçamento do MEI</span>
        </Box>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.4rem', sm: '1.65rem' },
            fontWeight: 800,
            color: '#1A1B20',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {editando ? `Editar orçamento ${codigo}` : 'Criar novo orçamento'}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#43474E', lineHeight: 1.5 }}>
          Conforme você preenche, a proposta em A4 vai se montando ao lado.
        </Typography>
      </Box>

      <CardCliente
        editando={editando}
        bloqueado={bloqueado}
        clientes={clientes}
        nome={cliente.nome}
        telefone={cliente.telefone}
        localizacao={cliente.localizacao}
        onNomeChange={cliente.setNome}
        onTelefoneChange={cliente.setTelefone}
        onLocalizacaoChange={cliente.setLocalizacao}
        onSelecionarCliente={cliente.selecionar}
        onCadastrarNovoCliente={onCadastrarNovoCliente}
      />

      <CardItens
        bloqueado={bloqueado}
        itens={itens}
        onAdicionarItem={onAdicionarItem}
        onRemoverItem={onRemoverItem}
        onAlterarItem={onAlterarItem}
        subtotal={subtotal}
        desconto={desconto}
        onDescontoChange={onDescontoChange}
        total={total}
      />

      <CardPagamento
        bloqueado={bloqueado}
        condicoesPagamento={condicoesPagamento}
        onCondicoesChange={onCondicoesChange}
        chavePix={chavePix}
        onChavePixChange={onChavePixChange}
        validade={validade}
        onValidadeChange={onValidadeChange}
        observacoes={observacoes}
        onObservacoesChange={onObservacoesChange}
      />
    </Box>
  );
}
