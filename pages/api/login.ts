import { NextApiHandler } from "next";
import api from "../../libs/api";

const handleLogin: NextApiHandler = async (req, res) => {
  const { email, password } = await req.body();

  if(email && password) {
    const user = await api.getUserByEmail(email)

    if(user) {
      if(user?.password === password) {
        res.status(200).json(user)
      }
    } else {
      res.status(400).json("Usuário não encotrado")
    }
  }; 
}

const handler: NextApiHandler = async (req, res) => {
    handleLogin(req, res)
}

export default handler;