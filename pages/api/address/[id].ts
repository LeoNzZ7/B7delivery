import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handleDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const deleteUser = await api.deleteAddress(id as string);

    if (deleteUser) {
      res.status(200).json({ "Usuário deletado com sucesso": deleteUser })
    }
  };

  res.status(400).json({ Error: "Envie todos os dados necessários" });
};

const handler: NextApiHandler = (req, res) => {
  handleDelete(req, res);
};

export default handler;