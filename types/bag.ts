import { Product } from "./product";

export type BagItems = {
  id: number;
  id_user: number;
  id_tenant: number;
  
  products: Product[]
};