import { NextApiResponse } from "next";
import prisma from "./prisma";

export default {
  getTenant: async (slug: string) => {
    return await prisma.tenant.findFirst({
      where: {  
        slug
      }
    })
  },
  
  getUsers: async () => {
    const user = await prisma?.user.findMany();

    if(user) {
      return user;
    }
  },

  getUserByEmail: async (email: string) => {
    const user = await prisma?.user.findFirst({
      where: {
        email
      }
    })

    if(user) {
      return user;
    }
  },

  createNewUser: async (name: string, email: string, password: string, res: NextApiResponse) => {
    if(name && email && password) {
      const user = await prisma?.user.findFirst({ 
        where: {
          email
        }
       });

       if(!user) {
        if(password.length >= 6) {
          const newUser = await prisma?.user.create({
            data: {
              name,
              email,
              password
            }
          });

          if(newUser) {
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
  }
}