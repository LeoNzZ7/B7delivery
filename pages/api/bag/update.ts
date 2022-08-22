import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { id, id_product } = req.body;

  if (id && id_product) {

    const newItemBag = await api.addNewItemBag(id, id_product);
    
    if (newItemBag) {
      res.status(200).json(newItemBag)
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