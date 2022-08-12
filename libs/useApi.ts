import { Product } from "../types/product";

const TemporaryOneProduct: Product[] = [
  {id: 1, image: '/temp/burguer001.png', name: 'Texas Burguer', categoryName: 'tradicional', price: 25.90, description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal.' },
  {id: 2, image: '/temp/burguer001.png', name: 'Golden Burguer', categoryName: 'tradicional', price: 25.90, description: 'Delicioso burguer de picanha' }
]
export const useApi = (tenantSlug: string) => ({

  getTenant: () => {
    switch (tenantSlug) {
      case 'b7burguer':
        return {
          slug: 'b7burguer',
          name: 'B7burguer',
          mainColor: '#FB9400',
          secondColor: '#FFF9F2'
        }
        break;

      case 'b7pizza':
        return {
          slug: 'b7pizza',
          name: 'B7pizza',
          mainColor: '#6AB70A',
          secondColor: '#E0E0E0'
        }
        break;

        dafault: return false;
    }
  },

  getAllProducts: () => {
    return TemporaryOneProduct;
  },

  getProduct: (id: string) => {
    for(let i in TemporaryOneProduct) {
      if(parseInt(id) === TemporaryOneProduct[i].id) {
        return TemporaryOneProduct[i];
      }
    }
  }
});