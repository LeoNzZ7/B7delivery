import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_user, id_tenant } = req.body;

  if(id_user) {
    const user = await api.getUser(id_user);
  
    if(user && user.id) {
      const user = await api.createNewBag(id_user, id_tenant);

      if(user) {
        res.status(201).json({ Created: user });
      };

      res.status(400).json({Error: "Não foi possível cria usuário"});
    };

    res.status(404).json({Error: "Este usuário não existe"});
  };

  res.status(401).json({Error: "Envie um id de usuário"});
};

const handle: NextApiHandler = async (req, res) => {
  handlePost(req, res);
};

export default handle;