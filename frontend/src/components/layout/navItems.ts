import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const NAV_ITEMS = [
  { label: 'Painel', path: '/dashboard', icon: DashboardIcon },
  { label: 'Orçamentos', path: '/orcamentos', icon: RequestQuoteIcon },
  { label: 'Recibos', path: '/recibos', icon: ReceiptLongIcon },
  { label: 'Faturamento e DAS', path: '/faturamento', icon: AccountBalanceIcon },
  { label: 'Clientes', path: '/clientes', icon: GroupIcon },
] as const;

/** Só aparece para a conta administradora definida no .env. */
export const NAV_ITEM_ADMIN = {
  label: 'Usuários',
  path: '/admin',
  icon: AdminPanelSettingsIcon,
} as const;

export const DRAWER_WIDTH = 288;
