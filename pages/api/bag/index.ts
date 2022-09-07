import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_user } = req.body;

  if (id_user) {
    const products = await api.getProductsBag(id_user);

    if (products) {
      res.status(200).json(products);
    };

    res.status(200).json({Products: "Não á produtos na sacola"})
  };

  res.status(401).json({Error: "Envie todos os dados necessários"})
};

const handle: NextApiHandler = async (req, res) => {
  handlePost(req, res);
};

export default handle;