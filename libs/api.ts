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
    })

    if (user) {
      return user;
    }
  },

  createNewBag: async (id_tenant: string, id_user: string, id_product: string) => {
    const newItemBag = await prisma.bag.create({
      data: {
        id_tenant: parseInt(id_tenant),
        id_user: parseInt(id_user),
        product: {
          connect: {
            id: parseInt(id_product)
          }
        }
      }
    });

    if(newItemBag) {
      return newItemBag;
    }

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

  addNewItemBag: async (id: string, id_product: string) => {
    const newItemBag = await prisma.bag.update({
      where: {
        id: parseInt(id)
      },
      data: {
        product: {
          connect: {
            id: parseInt(id_product)
          }
        }
      }
    });

    if(newItemBag) {
      return newItemBag;
    };

    return null;
  }
};