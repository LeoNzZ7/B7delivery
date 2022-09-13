import { NextApiHandler } from "next";
import api from "../../../libs/api";
import { Product } from "../../../types/product";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_user, id_tenant, payment_method, payment_money_return, delivery, subtotal, total } = req.body;
  
  if (id_user && id_tenant && payment_method && payment_money_return && delivery && subtotal && total) {
    const user = await api.getUser(id_user);

    if(user) {
      const address = await api.getUserActiveAddress(user.id);

      if(address) {
        const bagProducts = await api.getProductsBag(user.id.toString());

        if(bagProducts) {
          const newOrder = await api.createNewOrder(user.id, id_tenant, address.id, payment_method, payment_money_return, delivery, subtotal, total);

          if(newOrder) {
            const orderStatues = await api.createOrderStatues(newOrder.id, newOrder.status);

            if(orderStatues) {
              const orderProducts = await api.createOrderProducts(user.id, newOrder.id);

              if(orderProducts) {
                res.status(200).json({newOrder, orderStatues, orderProducts});
              };

              res.status(400).json({ Error: "Não foi possível atribuir os produtos ao pedido" });
            };

            res.status(400).json({ Error: "Falha ao criar o status do pedido" });
          };

          res.status(400).json({ Error: "Não foi possível fazer o pedido" });
        };

        res.status(404).json({ Error: "Você não tem itens na sacola" });
      };

      res.status(400).json({ Error: "Forneça um endereço válido" });
    };

    res.status(404).json({ Error: "Usuário não encontrado" });
  };

  res.status(401).json({ Error: "Envie todos os dados necessários" });
};

const handle: NextApiHandler = (req, res) => {
  handlePost(req, res);
};

export default handle;


  //const newOrder = await api.createNewOrder(id_user, id_tenant, id_address, payment_method, payment_money_return, delivery, subtotal, total);