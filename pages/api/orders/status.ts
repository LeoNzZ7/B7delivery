import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_user } = req.body;

  if(id_user) {
    const orderStatues = await api.getOrdersStatues(id_user);

    if(orderStatues) {
      res.json(orderStatues);
    };

    res.status(404).json({Error: "Não foi possível encontrar os status dos pedidos"})
  };

  res.status(401).json({Error: "Envie todos os dados necessários"})
};

const handle: NextApiHandler = async (req, res) => {
  handlePost(req, res);
};

export default handle;