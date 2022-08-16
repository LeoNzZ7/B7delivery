import { NextApiHandler } from "next";
import api from "../../../libs/api"

const Handler: NextApiHandler = async (req, res) => {
  const { slug } = await req.query;

  const tenant = await api.getTenant(slug as string);

  res.json(tenant);
}

export default Handler;