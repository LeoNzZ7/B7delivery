import { NextApiHandler } from "next";
import api from "../../../libs/api";
import { Product } from "../../../types/product";

const handlePost: NextApiHandler = async (req, res) => {
  const { id_user, id_tenant, payment_method, payment_money_return, delivery, subtotal, total } = req.body;
  
  if (id_user && id_tenant && payment_method && delivery && subtotal && total) {
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
              for(let i in bagProducts.products) {
                const newOrderProducts = await api.createOrderProducts(newOrder.id, bagProducts.products[i].id, bagProducts.products[i].quantity);
              };  

              const defaultProducts = await api.returnDefaultProducts(user.id);
              const orderProducts = await api.getOrderProducts(newOrder.id);

              if(defaultProducts) {
                res.status(200).json({ orderProducts, orderStatues, newOrder });
              };

              res.status(400).json({Error: "Falha ao finalizar o pedido"})
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
