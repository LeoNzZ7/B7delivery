import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePut: NextApiHandler = async (req, res) => {
  const { id_user, id_product } = req.body;

  if (id_user) {
    const user = await api.getUser(id_user);
  
    if (user) {
      const newItem = await api.addNewItemBag(id_user, id_product)

      if(newItem) {
        res.status(200).json({ Products: newItem });
      };

      res.status(400).json({ Error: "Não foi possível adicionar o produto a sacola" })
    };

    res.status(404).json({ Error: "Usuário não encontrado" });
  };

  res.status(401).json({ Error: "Envie um id de usuário" });
};


const handle: NextApiHandler = async (req, res) => {
  handlePut(req, res);
};

export default handle;