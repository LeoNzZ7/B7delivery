import { Product } from "../types/product";

const TemporaryOneProduct: Product = {
  id: 1,
  image: '/temp/burguer001.png',
  name: 'Texas',
  categoryName: 'tradicional',
  price: 25.90,
  description: 'Delicioso burguer de picanha'
}
export const UseApi = (tenantSlug: string) => ({

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
    let products: Product[] = [];
    for(let i = 0; i < 10; i++) {
      products.push(TemporaryOneProduct);
    }

    return products;
  },

  getProduct: (id: string) => {
    return TemporaryOneProduct;
  }
});