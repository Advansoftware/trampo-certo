'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

export interface OrcamentoItem {
  id: string;
  descricao: string;
  qtd: number;
  unitario: number;
}

interface ItemsTableCardProps {
  itens: OrcamentoItem[];
  valorTotal: number;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onItemChange: (id: string, field: keyof OrcamentoItem, value: any) => void;
}

export default function ItemsTableCard({
  itens,
  valorTotal,
  onAddItem,
  onRemoveItem,
  onItemChange,
}: ItemsTableCardProps) {
  return (
    <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          2. Itens do Serviço / Material
        </Typography>
        <Button
          size="small"
          startIcon={<AddCircleOutlinedIcon />}
          onClick={onAddItem}
          sx={{ borderRadius: 9999, fontWeight: 700, color: 'secondary.main' }}
        >
          + Adicionar Item
        </Button>
      </Box>

      {/* Desktop View: Table */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 700, color: 'text.secondary', borderBottom: '1px solid rgba(116,119,127,0.2)' } }}>
                <TableCell sx={{ pl: 0 }}>Descrição do Serviço / Material</TableCell>
                <TableCell align="center" sx={{ width: 80 }}>Qtd</TableCell>
                <TableCell align="right" sx={{ width: 130 }}>Unitário (R$)</TableCell>
                <TableCell align="right" sx={{ width: 130 }}>Subtotal</TableCell>
                <TableCell align="center" sx={{ width: 48, pr: 0 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itens.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ pl: 0, py: 1.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Descreva o serviço ou material..."
                      value={item.descricao}
                      onChange={(e) => onItemChange(item.id, 'descricao', e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ py: 1.5 }}>
                    <TextField
                      type="number"
                      size="small"
                      value={item.qtd}
                      onChange={(e) => onItemChange(item.id, 'qtd', Math.max(1, Number(e.target.value)))}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1.5 }}>
                    <TextField
                      type="number"
                      size="small"
                      value={item.unitario}
                      onChange={(e) => onItemChange(item.id, 'unitario', Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1.5, fontWeight: 700, color: 'primary.main' }}>
                    R$ {(item.qtd * item.unitario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell align="center" sx={{ pr: 0, py: 1.5 }}>
                    <IconButton
                      size="small"
                      color="error"
                      disabled={itens.length <= 1}
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Mobile View: Touch-friendly Card rows */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: 2 }}>
        {itens.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: '#F6F7FB',
              border: '1px solid rgba(116, 119, 127, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Item #{index + 1}
              </Typography>
              <IconButton
                size="small"
                color="error"
                disabled={itens.length <= 1}
                onClick={() => onRemoveItem(item.id)}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Descrição do serviço..."
              value={item.descricao}
              onChange={(e) => onItemChange(item.id, 'descricao', e.target.value)}
            />

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <TextField
                label="Qtd"
                type="number"
                size="small"
                sx={{ width: '35%' }}
                value={item.qtd}
                onChange={(e) => onItemChange(item.id, 'qtd', Math.max(1, Number(e.target.value)))}
              />
              <TextField
                label="Unitário (R$)"
                type="number"
                size="small"
                sx={{ width: '65%' }}
                value={item.unitario}
                onChange={(e) => onItemChange(item.id, 'unitario', Number(e.target.value))}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: '1px dashed rgba(116, 119, 127, 0.2)' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Subtotal:</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                R$ {(item.qtd * item.unitario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Subtotal / Total Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
          pt: 2,
          borderTop: '1px solid rgba(116, 119, 127, 0.15)',
        }}
      >
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Valor Total dos Serviços:
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
            R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
