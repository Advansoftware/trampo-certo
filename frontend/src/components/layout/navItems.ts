import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'Orçamentos & Propostas', path: '/orcamentos', icon: RequestQuoteIcon },
  { label: 'Recibos Emitidos', path: '/recibos', icon: ReceiptLongIcon },
  { label: 'Faturamento & DAS MEI', path: '/faturamento', icon: AccountBalanceIcon },
  { label: 'Clientes', path: '/clientes', icon: GroupIcon },
] as const;

export const DRAWER_WIDTH = 288;
