import { NextApiHandler } from "next";
import api from "../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { name, email, password } = await req.body;

  if(name && email && password) {
    const newUser = await api.createNewUser(name, email, password, res);

    if(newUser) {
      res.json(newUser);
    };

    res.json(newUser);
  }

  res.json({Error: "Preencha todos os campos"})
};

const handler: NextApiHandler = async (req, res) => {
  switch(req.method) {
    case "POST": 
      handlePost(req, res);
    break;
  }
}

export default handler;