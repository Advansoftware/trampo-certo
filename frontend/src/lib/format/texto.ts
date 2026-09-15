/** Iniciais para avatar: "Rodrigo Silva" -> "RS". */
export function iniciais(nome: string): string {
  const partes = (nome || '').trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

export function primeiroNome(nome: string): string {
  return (nome || '').trim().split(/\s+/)[0] || '';
}

/** Só dígitos — usado para montar links do WhatsApp. */
export function apenasDigitos(valor: string): string {
  return (valor || '').replace(/\D/g, '');
}

/** Link do WhatsApp com DDI 55; sem telefone, abre o seletor de contato. */
export function linkWhatsApp(telefone: string, mensagem: string): string {
  const numero = apenasDigitos(telefone);
  const texto = encodeURIComponent(mensagem);
  return numero ? `https://wa.me/55${numero}?text=${texto}` : `https://wa.me/?text=${texto}`;
}

/** "Rodrigo Silva" -> "rodrigo-silva"; usado no link de indicação. */
export function slugificar(valor: string): string {
  return (valor || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
