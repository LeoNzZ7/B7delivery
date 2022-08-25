import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handleGet: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if(id) {
    const bag = await api.getBag(id as string);

    if (bag) {
      res.json(bag);
    };

    res.json({ Error: "Não foi possível encontrar a sacola" });
  } 

  res.status(400).json({Error: "Preencha todos os dados necessários"})
}

const handle: NextApiHandler = async (req, res) => {
  handleGet(req, res);
};

export default handle;