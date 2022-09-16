export type Order = {
  id: number;
  id_address: number;
  id_tenant: number;
  id_user: number;
  delivery: number;
  payment_method: string;
  payment_money_return: number;
  status: string;
  subtotal: number;
  total: number;
};