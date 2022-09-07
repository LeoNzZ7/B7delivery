import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePut: NextApiHandler = async (req, res) => {
  const { id_product, qnt } = req.body;

  if (id_product && qnt) {
    const updateProduct = await api.updateProduct(id_product, qnt);

    if (updateProduct) {
      res.status(200).json({ "Dados Atualizados": updateProduct });
    };
  };

  res.status(401).json({ Error: "Envie todos os dados necessários" })
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST": 

    break;
    case "PUT":
      handlePut(req, res);
    break;
  }
};

export default handler;