import axios from "axios";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { OrdersComponent } from "../../../components/orders";
import { useAppContext } from "../../../contexts/app.content";
import { useApi } from "../../../libs/useApi";
import { AuthUser } from "../../../types/authUser";
import { Order } from "../../../types/orders";
import { OrderStatus } from "../../../types/ordersStatues";
import { Tenant } from "../../../types/tenant";
import { authOptions } from "../../api/auth/[...nextauth]";

const Orders = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  const { data: session, status: sessionStatus } = useSession();

  const [order, setOrder] = useState<Order[]>(data.orders);
  const [ordersStatues, setOrdersStatues] = useState<OrderStatus[]>();

  const handleGetOrdersStatues = async () => {
    const req = await axios.post("/api/orders/status", { id_user: session?.user.id });
    setOrdersStatues(req.data);
  };

  useEffect(() => {
    setTenant(data.tenant);
    handleGetOrdersStatues();
  }, []);

  return (
    <div>
      <Head>
        <title>
          Meus Pedidos | {tenant?.name}
        </title>
      </Head>
      <div className="mb-10" >
        <Header title="Meus Pedidos" />
      </div>
      <div>
        {order && ordersStatues &&
          order.map((item, index) => (
            <OrdersComponent key={index} orders={item} ordersStatues={ordersStatues[index]} />
          ))
        }
      </div>
    </div>
  );
};

export default Orders;

type Props = {
  tenant: Tenant;
  orders: Order[];
  session: AuthUser
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = await context.query;
  const session = await unstable_getServerSession(
    context.req, context.res, authOptions
  );

  const api = await useApi(tenantSlug as string);
  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  };

  if (!session) {
    return { redirect: { destination: '/singin', permanent: false } }
  };

  const orders = await api.getOrders(session?.user.id);

  return {
    props: {
      tenant,
      orders
    }
  };
};