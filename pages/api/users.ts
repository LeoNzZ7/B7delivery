import { NextApiHandler } from "next";
import api from "../../libs/api";

const handleGet: NextApiHandler = async (req, res) => {
  const users = await api.getUsers();
  
  if(users) {
    res.json(users)
  };

  res.status(404).json({Error: "Não à usuários cadastrados"})
};

const handlePost: NextApiHandler = async (req, res) => {
  const { name, email, password } = await req.body;

  console.log(name, email, password)

  if(name && email && password) {
    const newUser = await api.createNewUser(name, email, password, res);

    if(newUser) {
      res.json(newUser);
    };

    res.json(newUser);
  }

  res.status(400).json({Error: "Preencha todos os dados"})
};

const handler: NextApiHandler = async (req, res) => {
  switch(req.method) {
    case "GET": 
      handleGet(req, res);
    break;
    case "POST": 
      handlePost(req, res);
    break;
  }
}

export default handler;