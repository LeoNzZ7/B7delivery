import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../../libs/api";

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
        if (crendentials && crendentials.password && crendentials.password) {
          const user = await api.getUserByEmail(crendentials.email);

          if(user) {
            if(crendentials.password === user.password) {
              return user;
            }
          }
        }

        return null
    }})
  ]
};

export default nextAuth(authOptions);