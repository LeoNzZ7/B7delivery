import { NextApiResponse } from "next";
import { Product } from "../types/product";
import prisma from "./prisma";

export default {
  getTenant: async (slug: string) => {
    return await prisma.tenant.findFirst({
      where: {
        slug
      }
    });
  },

  getUser: async (id: string) => {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id)
      }
    });

    if (user) {
      return user;
    };

    return null;
  },

  getUsers: async () => {
    const user = await prisma?.user.findMany();

    if (user) {
      return user;
    };
  },

  getUserByEmail: async (email: string) => {
    const user = await prisma?.user.findFirst({
      where: {
        email
      }
    });

    if (user) {
      return user;
    };

    return null;
  },

  createNewUser: async (name: string, email: string, password: string, res: NextApiResponse) => {
    if (name && email && password) {
      const user = await prisma?.user.findFirst({
        where: {
          email
        }
      });

      if (!user) {
        if (password.length >= 6) {
          const newUser = await prisma?.user.create({
            data: {
              name,
              email,
              password
            }
          });

          if (newUser) {
            return {
              id: newUser.id,
              email: newUser.email,
              password: newUser.password
            };
          } else {
            res.status(400).json("Falha ao criar novo usuário")
          };
        } else {
          res.status(400).json("Senha muito fraca")
        };
      } else {
        res.status(400).json("Email já cadastrado")
      };
    } else {
      res.status(400).json("Preencha todos os campos")
    };
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
        return {
          products
        };
      };
    };

    return null;
  },

  getUserAddress: async (id: string) => {
    const addresses = await prisma.user_Addresses.findMany({
      where: {
        id: parseInt(id)
      }
    });

    if (addresses) {
      return addresses;
    };

    return null;
  },

  getUserActiveAddress: async (id: number) => {
    const address = await prisma.user_Addresses.findFirst({
      where: {
        id_user: id,
        active: "true"
      }
    });

    if (address) {
      return address;
    };

    return null;
  },

  createNewAddress: async (id_user: string, street: string, house_number: string, zipcode: string, city: string, state: string, complement?: string) => {
    const userAddress = await prisma.user_Addresses.findMany({
      where: {
        id_user: parseInt(id_user)
      }
    });

    const newAddress = await prisma.user_Addresses.create({
      data: {
        id_user: parseInt(id_user),
        street,
        house_number: parseInt(house_number),
        zipcode: parseInt(zipcode),
        city,
        state,
        complement,
        active: userAddress.length > 0 ? "no" : "yes"
      }
    });

    if (newAddress) {
      return newAddress;
    };

    return null;
  },

  updateAddress: async (id: string, id_user: string, street: string, house_number: string, zipcode: string, city: string, state: string, complement?: string) => {
    const updateAddress = await prisma.user_Addresses.updateMany({
      where: {
        id: parseInt(id),
        id_user: parseInt(id_user)
      },
      data: {
        street,
        house_number: parseInt(house_number),
        zipcode: parseInt(zipcode),
        city,
        state,
        complement,
      }
    });

    if (updateAddress) {
      return updateAddress;
    }

    return null;
  },

  deleteAddress: async (id: string) => {
    const deleteAddress = await prisma.user_Addresses.deleteMany({
      where: {
        id: parseInt(id),
      }
    });

    if (deleteAddress) {
      return deleteAddress;
    }

    return null;
  },

  updateProduct: async (id_product: string, qnt: string) => {
    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(id_product)
      }
    });

    if (product) {
      product.price = product.price * parseInt(qnt)

      const updateProduct = await prisma.product.update({
        where: {
          id: parseInt(id_product)
        },
        data: {
          multiplePrice: product.price
        }
      });

      if (updateProduct) {
        return updateProduct;
      }
    }

    return null;
  },

  createNewBag: async (id_user: string, id_tenant: string) => {
    const newItemBag = await prisma.bag.create({
      data: {
        id_user: parseInt(id_user),
        id_tenant: parseInt(id_tenant),
      }
    });

    if (newItemBag) {
      return newItemBag;
    }

    return null;
  },

  addNewItemBag: async (id_user: string, id_product: string) => {
    const newItemBag = await prisma.bag.update({
      where: {
        id_user: parseInt(id_user)
      },
      data: {
        product: {
          connect: {
            id: parseInt(id_product)
          }
        }
      }
    });

    if (newItemBag) {
      return newItemBag;
    };

    return null;
  },

  deleteItemBag: async (id_user: string, id_product: string) => {
    const removeItemBag = await prisma?.bag.update({
      where: {
        id_user: parseInt(id_user)
      },
      data: {
        product: {
          disconnect: {
            id: parseInt(id_product)
          }
        }
      }
    });

    if (removeItemBag) {
      return removeItemBag;
    };

    return null;
  },

  deleteBag: async (id: number) => {
    const deleteBag = await prisma.bag.delete({
      where: {
        id_user: id
      }
    });

    if (deleteBag) {
      return deleteBag;
    };

    return null;
  },

  createNewOrder: async (id_user: number, id_tenant: string, id_address: number, payment_method: string, payment_money_return: string, delivery: string, subtotal: string, total: string) => {
    const newOrder = await prisma.orders.create({
      data: {
        id_user,
        id_tenant: parseInt(id_tenant),
        id_address,
        status: "preparando",
        payment_method,
        payment_money_return: parseFloat(payment_money_return),
        delivery: parseFloat(delivery),
        subtotal: parseFloat(subtotal),
        total: parseFloat(total),
      }
    });

    if(newOrder) {
      return newOrder;
    };

    return null
  },

  createOrderProducts: async (id_user: number, id_order: number) => {
    const bag = await prisma.bag.findFirst({
      where: {
        id_user
      }
    });

    if(bag) {
      const products = await prisma.product.findMany({
        where: {
          id_bag: bag.id
        }
      });

      if(products) {
        for(let i in products) {
          const orderProducts = await prisma.order_product.create({
            data: {
              id_order,
              id_products: products[i].id,
              quantity: products[i].quantity
            }
          });
          
          if(orderProducts) {
            return orderProducts;
          };

          return null;
        };
      };

      return null;
    }

    return null;
  },

  createOrderStatues: async (id_order: number, status: string) => {
    const newOrderStatus = await prisma.order_statues.create({
      data: {
        id_order,
        status
      }
    });

    if(newOrderStatus) {
      return newOrderStatus;
    };

    return null;
  }
};