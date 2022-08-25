import prisma from "./prisma"

export const useApi = async (tenantSlug: string) => ({

  getTenant: async () => {
    const tenant = await prisma?.tenant.findFirst({
      where: {
        slug: tenantSlug
      }
    })

    if (tenant) {
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

    if (products) {
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

    if (product) {
      return product;
    }

    return null;
  },

  getProductsBag: async (id: string) => {
    const bag = await prisma.bag.findFirst({
      where: {
        id_user: parseInt(id)
      }
    });

    if (bag) {
      const products = await prisma.product.findMany({
        where: {
          id_bag: bag.id
        }
      });

      if (products) {
        return products
      };
    };

    return null;
  }
});