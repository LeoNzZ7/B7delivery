import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_user } = req.body;

  if (id_user) {

  } 

  res.status(400).json({Error: "Preencha todos os dados"})
};

const handle: NextApiHandler = async (req, res) => {
  handlePost(req, res);
};

export default handle;