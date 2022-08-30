import { NextApiResponse } from "next";
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

      if(products) {
        return {
          products
        };
      };
    };

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

    if(deleteBag) {
      return deleteBag;
    };

    return null;
  }
};