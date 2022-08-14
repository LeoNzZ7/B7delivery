import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../../libs/api";
import { AuthUser } from "../../../types/authUser";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: "E-mail", type: "text", value: "" },
        password: { label: "Senha", type: "password" }
      },
      authorize: async (crendentials, req) => {
        if (crendentials && crendentials.password && crendentials.password) {
          const user = await api.getUserByEmail(crendentials.email);

          if(user) {
            if(crendentials.password === user.password) {
              return user;
            }
          }
        }

        return null;
    }})
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if(user) token.user = user;

      return token;
    },
    session: async ({ session, token }) => {
      if(token) {
        session.user = token.user as AuthUser;
      }
      
      return session;
    }
  },
  pages: {
    signIn: "/singin"
  }
};

export default nextAuth(authOptions);