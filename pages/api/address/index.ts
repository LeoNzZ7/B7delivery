import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_user, street, house_number, zipcode, city, state, complement } = req.body;

  if (id_user && street && house_number && zipcode && city && state) {
    const user = await api.getUser(id_user);

    if (user) {
      const newAddress = await api.createNewAddress(id_user, street, house_number, zipcode, city, state, complement);

      if (newAddress) {
        res.status(200).json(newAddress);
      };

      res.status(400).json({ Error: "Não foi possível adicionar um novo endereço a sua conta" });
    };

    res.status(404).json({ Error: "Usuário não encontrado" });
  };

  res.status(401).json({ Error: "Envie todos os dados necessários" });
};

const handlePut: NextApiHandler = async (req, res) => {
  const { id, id_user, street, house_number, zipcode, city, state, complement } = req.body;

  if (id && id_user && street && house_number && zipcode && city && state) {
    const user = await api.getUser(id_user);

    if (user) {
      const updateAddress = await api.updateAddress(id, id_user, street, house_number, zipcode, city, state, complement);

      if (updateAddress) {
        res.status(200).json({ "Usuário atualizado": updateAddress })
      };

      res.status(400).json({ Error: "Não foi possível atualizar o seu endereço" })
    };

    res.status(404).json({ Error: "Usuário não encontrado" });
  };

  res.status(401).json({ Error: "Envie todos os dados necessários" });
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      handlePost(req, res);
      break;
    case "PUT":
      handlePut(req, res);
      break;
  };
};

export default handler;