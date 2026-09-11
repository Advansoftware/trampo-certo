'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { OrcamentoPreviewItem } from '../OrcamentoA4Preview';
import { estiloInput, focoInput } from './camposEstilo';

const UNIDADES = ['un', 'h', 'm²', 'm'];

interface LinhaItemProps {
  item: OrcamentoPreviewItem;
  bloqueado: boolean;
  podeRemover: boolean;
  onChange: (id: string, campo: keyof OrcamentoPreviewItem, valor: string | number) => void;
  onRemover: (id: string) => void;
}

const rotulo = { fontSize: '10px', color: '#43474E', textTransform: 'uppercase' as const, fontWeight: 600 };

/** Uma linha da tabela dinâmica de serviços e materiais. */
export default function LinhaItem({ item, bloqueado, podeRemover, onChange, onRemover }: LinhaItemProps) {
  return (
    <Box
      sx={{
        p: 1.75,
        bgcolor: '#F1F4F9',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 1.5,
        transition: 'all 0.15s ease',
        '&:hover': { borderColor: 'rgba(30, 58, 138, 0.35)', bgcolor: 'rgba(241, 244, 249, 0.7)' },
      }}
    >
      <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography sx={rotulo}>Descrição técnica</Typography>
        <input
          type="text"
          value={item.descricao}
          disabled={bloqueado}
          readOnly={bloqueado}
          onChange={(evento) => onChange(item.id, 'descricao', evento.target.value)}
          placeholder="Descrição do serviço ou material"
          style={estiloInput({ bloqueado, padding: '8px 12px', fundo: '#FFFFFF', fonte: '13px' })}
          {...focoInput(bloqueado, '#FFFFFF')}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', md: 'auto' } }}>
        <Box sx={{ width: 68, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={rotulo}>Qtd</Typography>
          <input
            type="number"
            min="1"
            placeholder="1"
            value={item.qtd || ''}
            disabled={bloqueado}
            readOnly={bloqueado}
            onChange={(evento) => {
              const valor = evento.target.value;
              onChange(item.id, 'qtd', valor === '' ? 1 : Math.max(1, Number.parseInt(valor, 10) || 1));
            }}
            onFocus={(evento) => !bloqueado && evento.target.select()}
            style={estiloInput({
              bloqueado,
              padding: '8px 6px',
              fundo: '#FFFFFF',
              fonte: '13px',
              alinhamento: 'center',
            })}
          />
        </Box>

        <Box sx={{ width: 88, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={rotulo}>Unidade</Typography>
          <select
            value={item.unidade || 'un'}
            disabled={bloqueado}
            onChange={(evento) => onChange(item.id, 'unidade', evento.target.value)}
            style={estiloInput({ bloqueado, padding: '8px 6px', fundo: '#FFFFFF', fonte: '13px' })}
          >
            {UNIDADES.map((unidade) => (
              <option key={unidade} value={unidade}>
                {unidade}
              </option>
            ))}
          </select>
        </Box>

        <Box sx={{ width: 110, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={rotulo}>Unitário</Typography>
          <Box sx={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#74777F' }}
            >
              R$
            </span>
            <input
              type="number"
              step="any"
              min="0"
              placeholder="0"
              value={item.unitario === 0 ? '' : item.unitario}
              disabled={bloqueado}
              readOnly={bloqueado}
              onChange={(evento) => {
                const valor = evento.target.value;
                onChange(item.id, 'unitario', valor === '' ? 0 : Math.max(0, Number.parseFloat(valor) || 0));
              }}
              onFocus={(evento) => !bloqueado && evento.target.select()}
              style={estiloInput({
                bloqueado,
                padding: '8px 8px 8px 26px',
                fundo: '#FFFFFF',
                fonte: '13px',
                alinhamento: 'right',
              })}
            />
          </Box>
        </Box>

        <Box sx={{ pt: { xs: 0, md: 2.2 } }}>
          <IconButton
            size="small"
            onClick={() => onRemover(item.id)}
            disabled={!podeRemover || bloqueado}
            title="Remover item"
            sx={{ color: '#74777F', '&:hover': { color: '#BA1A1A', bgcolor: '#FFDAD6' } }}
          >
            <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
