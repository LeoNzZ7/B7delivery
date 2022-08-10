import { NextApiHandler } from "next";
import prisma from "../../libs/prisma";

const handleGet: NextApiHandler = async (req, res) => {
  const user = await prisma.user.findMany()

  res.json(user)
}

const handler: NextApiHandler = (req, res) => {
  handleGet(req, res)
}

export default handler;