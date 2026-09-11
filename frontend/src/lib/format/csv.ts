/** Escapa um campo para CSV (aspas duplicadas e delimitadores protegidos). */
function escaparCampo(valor: unknown): string {
  const texto = valor === null || valor === undefined ? '' : String(valor);
  return `"${texto.replace(/"/g, '""')}"`;
}

/**
 * Gera e baixa um CSV.
 *
 * Usa Blob + BOM UTF-8: `data:` URI trunca o arquivo em qualquer célula que
 * contenha "#" e estoura o limite de tamanho do Chrome em listas grandes.
 */
export function baixarCsv(nomeArquivo: string, cabecalhos: string[], linhas: unknown[][]): void {
  const conteudo = [cabecalhos, ...linhas].map((linha) => linha.map(escaparCampo).join(',')).join('\r\n');

  const blob = new Blob(['﻿' + conteudo], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Sufixo com a data de hoje para nomes de arquivo. */
export function sufixoDataArquivo(): string {
  return new Date().toISOString().slice(0, 10);
}
