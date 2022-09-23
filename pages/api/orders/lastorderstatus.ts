import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handle: NextApiHandler = async (req, res) => {
  const { id_user } = req.body;

  if(id_user) {
    const lastOrderStatus = await api.getLastOrderStatus(id_user);

    if(lastOrderStatus) {
      res.status(200).json(lastOrderStatus);
    };

    res.status(404).json({ Error: "Não foi possível encontrar o status de pedido" });
  };

  res.status(401).json({ Error: "Envie todos os dados" });
};

export default handle;