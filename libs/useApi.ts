import prisma from "./prisma"
import { Product } from "../types/product";

const TemporaryOneProduct: Product[] = [
  {id: 1, img: '/images/B7delivery/img - Golden Burger.png', name: 'Texas Burger', categoryName: 'tradicional', price: 25.90, description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal.' },
  {id: 2, img: '/images/B7delivery/img - Monster Burger.png', name: 'Golden Burger', categoryName: 'tradicional', price: 25.90, description: 'Delicioso burguer de picanha' }
]
export const useApi = async (tenantSlug: string) => ({

  getTenant: async () => {
    const tenant = await prisma?.tenant.findFirst({
      where: {
        slug: tenantSlug
      }
    })

    if(tenant) {
      return tenant;
    } 

    return null;
  },

  getAllProducts: async () => {
    const products = await prisma?.product.findMany({
      where: {
        tenant: {
          slug: tenantSlug
        }
      }
    });

    if(products) {
      return products;
    };

    return null;
  },

  getProduct: async (id: string) => {
    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(id)
      }
    }) 

    if(product) {
      return product;
    }

    return null;
  }
});