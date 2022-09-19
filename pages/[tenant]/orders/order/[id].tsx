import axios from "axios";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; import { Header } from "../../../../components/header";
import { useAppContext } from "../../../../contexts/app.content";
import { useApi } from "../../../../libs/useApi";
import { Order } from "../../../../types/orders";
import { OrderStatus } from "../../../../types/ordersStatues";
import { Tenant } from "../../../../types/tenant";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Product } from "../../../../types/product";
import Link from "next/link";
import { Address } from "../../../../types/addresses";
import { AddressesComponent } from "../../../../components/addresses";
import { CaretRight, CheckCircle, CreditCard, CurrencyCircleDollar, MapPin, Ticket } from "phosphor-react";

const Orders = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  const [products, setProducts] = useState<Product[]>(data.products);
  const [order, setOrder] = useState<Order>(data.order);
  const [ordersStatus, setOrdersStatus] = useState<OrderStatus>({ id: 0, created_at: null, id_order: 0, status: "preparando" });
  const [paymentMethod, setPaymentMethod] = useState<"currency" | "card" | string>(data.order.payment_method);
  const [moneyReturn, setMoneyReturn] = useState<number>(data.order.payment_money_return);
  const [moneyReturnInputActive, setMoneyReturnInputActive] = useState(false);

  const router = useRouter();

  const handleGetOrdersStatues = async () => {
    const req = await axios.post("/api/orders/status", { id_order: router.query.id });
    setOrdersStatus(req.data);
  };

  useEffect(() => {
    setTenant(data.tenant);
    handleGetOrdersStatues();
  }, []);

  const date = new Date(ordersStatus?.created_at as Date);
  const orderDateFormatted = format(date, "' 'd'/'MM'/'yyyy' - ' k':'mm", {
    locale: ptBR,
  });

  return (
    <div>
      <Head>
        <title>
          Pedido #{router.query.id} | {tenant?.name}
        </title>
      </Head>
      <div>
        <Header title={`Pedido #${router.query.id}`} subTitle={orderDateFormatted} />
      </div>
      <div className="px-5 mt-4" >
        <div className="flex justify-between" >
          <span>
            {products.length} Itens
          </span>
          {order.status === "preparando" &&
            <span className="bg-[#FEFAE6] w-[78px] h-[26px] flex items-center justify-center text-[#D4BC34] text-[11px] font-semibold first-letter:uppercase rounded" >
              {order.status}
            </span>
          }
          {order.status === "enviado" &&
            <span className="bg-[#EDF1F8] w-[78px] h-[26px] flex items-center justify-center text-[#4F77BE] text-[11px] font-semibold first-letter:uppercase rounded" >
              {order.status}
            </span>
          }
          {order.status === "entregue" &&
            <span className="bg-[#F1F8F6] w-[78px] h-[26px] flex items-center justify-center text-[#6AB70A] text-[11px] font-semibold first-letter:uppercase rounded" >
              {order.status}
            </span>
          }
          {order.status === "cancelado" &&
            <span className="bg-[#F1D5DA] w-[78px] h-[26px] flex items-center justify-center text-[#C44D61] text-[11px] font-semibold first-letter:uppercase rounded" >
              {order.status}
            </span>
          }
        </div>
        <hr className="mt-4 mb-4" />
        {products &&
          products.map((item, index) => (
            <div key={index} >
              <div className="flex items-center justify-between h-[85px] w-[373px]">
                <Link href={`/${tenant?.slug}/product/${item.id}`}>
                  <div className="w-[75px] h-[75px] flex justify-center items-center" >
                    <img src={item.image} className="w-[85px] h-auto" />
                  </div>
                </Link>
                <div className="flex flex-col flex-1 justify-between p-2" >
                  <span className="text-[12px] font-medium text-[#666]">{item.category}</span>
                  <span className="text-[#1B1B1B] text-[18px]">{item.name}</span>
                  <span className="text-[#FB9400] text-[16px] font-semibold">
                    {(item.multiplePrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <div>
                  <span style={{ color: tenant?.mainColor }} >Qnt.</span>
                  <div className="w-11 h-11 border flex items-center justify-center font-bold border-[#F2F4F5] rounded" style={{ color: tenant?.mainColor }} >
                    {item.quantity < 10 ? "0" : null}{item.quantity}
                  </div>
                </div>
              </div>
              <hr className="mb-4 mt-4" />
            </div>
          ))
        }
      </div>
      <div className="mt-5 px-5">
        <span>Endereço</span>
        <Link href={`/${data.tenant.slug}/checkout/addresses`} >
          <div className="h-[60px] mt-2 rounded-md bg-[#F9F9FB] flex items-center justify-between px-2">
            <div className="bg-white w-12 h-12 flex items-center justify-center rounded-md">
              <MapPin size={24} weight="bold" style={{ color: data.tenant.mainColor }} />
            </div>
            <div className="text-[15px]" >
              {data.address &&
                <span>
                  {data.address.house_number} - {data.address.street.length > 20 ? data.address.street.slice(0, 20) + "..." : data.address.street} - {data.address.city.slice(0, 4)}...
                </span>
              }
            </div>
            <div>
              <CaretRight size={24} weight="bold" style={{ color: data.tenant.mainColor }} />
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-5 px-5">
        <span>Tipo de pagamento</span>
        <div className="flex justify-between items-center mt-2 ">
          <div
            style={{ background: paymentMethod === "currency" ? tenant?.mainColor : "#F9F9FB" }}
            className="w-[178px] h-[60px] px-2 flex items-center rounded transition-colors">
            <div
              className="h-12 w-12 bg-red-[] flex items-center justify-center rounded transition-colors"
              style={{ background: paymentMethod === "currency" ? "#F08E00" : "#F9F9FB" }}
            >
              <CurrencyCircleDollar
                style={{ color: paymentMethod === "currency" ? "#FFF" : "#000" }}
                size={24}
              />
            </div>
            <span className="ml-5" style={{ color: paymentMethod === "currency" ? "#FFF" : "#000" }}  >
              Dinheiro
            </span>
          </div>
          <div
            style={{ background: paymentMethod === "card" ? tenant?.mainColor : "#F9F9FB" }}
            className="w-[178px] h-[60px] px-2 flex items-center rounded transition-colors">
            <div
              className="h-12 w-12 flex items-center justify-center rounded transition-colors"
              style={{ background: paymentMethod === "card" ? "#F08E00" : "#F9F9FB" }}
            >
              <CreditCard
                style={{ color: paymentMethod === "card" ? "#FFF" : "#000" }}
                size={24}
              />
            </div>
            <span className="ml-5" style={{ color: paymentMethod === "card" ? "#FFF" : "#000" }}  >
              Cartão
            </span>
          </div>
        </div>
      </div>
      {paymentMethod === "currency" &&
        <div className="mt-5 px-5">
          {moneyReturnInputActive &&
            <label className="flex flex-col" >
              <span>Troco</span>
              <input
                type="number"
                className={`border-2 bg-[#F9F9FB] h-[60px] rounded-md focus:border-2 focus:ring-0`}
                style={{ borderColor: moneyReturnInputActive ? tenant?.mainColor : "#FFF" }}
                onChange={e => setMoneyReturn(e.target.valueAsNumber)}
                onBlur={() => setMoneyReturnInputActive(false)}
                value={moneyReturn}
                placeholder="Digite quanto você vai precisar de troco"
              />
            </label>
          }
          {!moneyReturnInputActive &&
            <div className="bg-[#F9F9FB] h-[60px] flex items-center">
              <span className="ml-4" >
                {moneyReturn.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          }
        </div>
      }
      <div className="mt-5 px-5">
        <span>Cupom de desconto</span>
        <div className=" bg-[#F9F9FB] mt-2 h-[60px] flex items-center justify-between px-2 rounded-md">
          <div className="flex items-center justify-center">
            <div className="bg-white h-12 w-12 flex items-center justify-center rounded-md">
              <Ticket size={24} style={{ color: tenant?.mainColor }} />
            </div>
            <span className="uppercase ml-5" >
              Burger10
            </span>
          </div>
          <div >
            <CheckCircle className="rounded-full text-[#6AB70A]" size={24} />
          </div>
        </div>
      </div>
      <div className="px-5" >
        <div className="bg-[#F9F9FB] my-5 p-5">
          <div className="flex justify-between">
            <span>
              Subtotal
            </span>
            <span>
              {order.subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className="flex justify-between my-2 border-opacity-60">
            <span>
              Frete
            </span>
            <span>
              {order.delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className="flex justify-between border-dashed border-t mt-5 border-[#96A3AB]">
            <span className="mt-5" >
              Total
            </span>
            <span className="text-[#FB9400] font-semibold text-[24px] mt-5" >
              {order.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

type Props = {
  tenant: Tenant;
  order: Order;
  products: Product[];
  address: Address
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = await context.query;
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

  const order = await api.getOrder(id as string);
  const products = await api.getOrderProducts(order?.id as number);
  const address = await api.getOrderAddress(order?.id as number);

  return {
    props: {
      tenant,
      order,
      products,
      address
    }
  };
};