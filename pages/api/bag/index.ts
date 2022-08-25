import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_tenant, id_user, id_product } = req.body;

  if (id_tenant && id_user && id_product) {

    const newBag = await api.createNewBag(id_tenant, id_user, id_product);

    if (newBag) {
      res.status(200).json(newBag)
    } else {
      res.status(400).json({ Error: "Não foi possível adicionar o produto a sacola" })
    };

  } else {
    res.status(400).json({ Error: "Preencha todos os campos" })
  };
};

const handle: NextApiHandler = async (req, res) => {
  handlePost(req, res);
};

export default handle;