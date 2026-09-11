const UNIDADES = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const DEZ_A_DEZENOVE = [
  'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze',
  'dezesseis', 'dezessete', 'dezoito', 'dezenove',
];
const DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const CENTENAS = [
  '', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos',
  'seiscentos', 'setecentos', 'oitocentos', 'novecentos',
];

function trioPorExtenso(numero: number): string {
  if (numero === 100) return 'cem';
  const partes: string[] = [];
  const centena = Math.floor(numero / 100);
  const resto = numero % 100;

  if (centena > 0) partes.push(CENTENAS[centena]);
  if (resto >= 10 && resto < 20) {
    partes.push(DEZ_A_DEZENOVE[resto - 10]);
  } else {
    const dezena = Math.floor(resto / 10);
    const unidade = resto % 10;
    if (dezena > 0) partes.push(DEZENAS[dezena]);
    if (unidade > 0) partes.push(UNIDADES[unidade]);
  }
  return partes.join(' e ');
}

function inteiroPorExtenso(valor: number): string {
  if (valor === 0) return 'zero';

  const milhoes = Math.floor(valor / 1_000_000);
  const milhares = Math.floor((valor % 1_000_000) / 1000);
  const unidades = valor % 1000;
  const partes: string[] = [];

  if (milhoes > 0) partes.push(`${trioPorExtenso(milhoes)} ${milhoes === 1 ? 'milhão' : 'milhões'}`);
  if (milhares > 0) partes.push(milhares === 1 ? 'mil' : `${trioPorExtenso(milhares)} mil`);
  if (unidades > 0) partes.push(trioPorExtenso(unidades));

  return partes.join(' e ');
}

/** "Um mil quatrocentos e cinquenta reais" — usado no corpo do recibo. */
export function valorPorExtenso(valor: number): string {
  const inteiro = Math.floor(Math.abs(valor));
  const centavos = Math.round((Math.abs(valor) - inteiro) * 100);

  const partes = [`${inteiroPorExtenso(inteiro)} ${inteiro === 1 ? 'real' : 'reais'}`];
  if (centavos > 0) {
    partes.push(`${inteiroPorExtenso(centavos)} ${centavos === 1 ? 'centavo' : 'centavos'}`);
  }

  const texto = partes.join(' e ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
