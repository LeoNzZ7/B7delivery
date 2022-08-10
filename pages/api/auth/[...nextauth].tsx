import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      authorize: async (crendentials, req) => {
        if(crendentials?.email === "leonardomartinha@gmail.com") {
          const user = {
            id: 123,
            name: "Leonardo",
            email: "leonardomartinha@gmail.com",
            password: "123 "
          }

          return user;
        }
        
        return null
      }
    })
  ]
};

export default NextAuth(authOptions);