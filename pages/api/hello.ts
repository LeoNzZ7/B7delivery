import { NextApiHandler } from "next";
import prisma from "../../libs/prisma";


const handler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
      password
    }
  })

  if(user) {
    res.json(user)
  }
}

export default handler;