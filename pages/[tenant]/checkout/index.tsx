import axios from "axios";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CaretRight, CheckCircle, CreditCard, CurrencyCircleDollar, MapPin, Ticket } from "phosphor-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/button";
import { Counter } from "../../../components/counter";
import { useAppContext } from "../../../contexts/app.content";
import { useApi } from "../../../libs/useApi";
import { Address } from "../../../types/addresses";
import { Product } from "../../../types/product";
import { Tenant } from "../../../types/tenant";
import { authOptions } from "../../api/auth/[...nextauth]";

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const { data: session } = useSession();

  const [address, setAddress] = useState<Address>(data.address);
  const [products, setProducts] = useState<Product[]>(data.products);
  const [paymentMethod, setPaymentMethod] = useState<"currency" | "card">("currency");
  const [moneyReturn, setMoneyReturn] = useState<number>(0);
  const [moneyReturnInputActive, setMoneyReturnInputActive] = useState(false);
  const [delivery, setDelivery] = useState(12.50);
  const [discount, setDiscount] = useState(5);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const handleFinishOrder = async () => {
    let price = 0

    for (let i = 0; i < products.length; i++) {
      price += Math.round(products[i].multiplePrice)
      Math.round(price);
    };

    setSubTotal(price + delivery);
    setDiscount(Math.round((subTotal / 100) * 5));
    setTotal(Math.round(subTotal - discount));

    const order = await axios.post("/api/orders/", {
      id_user: session?.user.id, id_tenant: tenant?.id, payment_method: paymentMethod, payment_money_return: moneyReturn, delivery, subtotal: subTotal, total
    });

    if(order) {
      router.push(`/${data.tenant.slug}`)
    };
  };

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  useEffect(() => {
    let price = 0

    for (let i = 0; i < products.length; i++) {
      price += Math.round(products[i].multiplePrice)
      Math.round(price);
    };

    setSubTotal(price + delivery);
    setDiscount(Math.round((subTotal / 100) * 5));
    setTotal(Math.round(subTotal - discount));
  });

  return (
    <div className="px-6">
      <Head>
        <title>Checkout | {data.tenant?.name}</title>
      </Head>
      <div className="mt-14 flex items-center">
        <button onClick={() => router.back()} style={{ color: data.tenant?.mainColor as string }} >
          <ArrowLeft size={24} className="w-6" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="font-semibold text-[24px] text-[#1B1B1B]">Checkout</h1>
        </div>
      </div>
      <hr className="mt-3" />
      <div className="mt-5">
        <span>Endereço</span>
        <Link href={`/${data.tenant.slug}/checkout/addresses`} >
          <div className="h-[60px] mt-2 rounded-md bg-[#F9F9FB] flex items-center justify-between px-2">
            <div className="bg-white w-12 h-12 flex items-center justify-center rounded-md">
              <MapPin size={24} weight="bold" style={{ color: data.tenant.mainColor }} />
            </div>
            <div className="text-[15px]" >
              {address &&
                <span>
                  {address.house_number} - {address.street.length > 20 ? address.street.slice(0, 20) + "..." : address.street} - {address.city.slice(0, 4)}...
                </span>
              }
            </div>
            <div>
              <CaretRight size={24} weight="bold" style={{ color: data.tenant.mainColor }} />
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-5">
        <span>Tipo de pagamento</span>
        <div className="flex justify-between items-center mt-2 ">
          <div
            onClick={() => setPaymentMethod("currency")}
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
            onClick={() => setPaymentMethod("card")}
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
        <div className="mt-5">
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
            <div className="bg-[#F9F9FB] h-[60px] flex items-center" onClick={() => setMoneyReturnInputActive(!moneyReturnInputActive)}  >
              <span className="ml-4" >
                {moneyReturn.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          }
        </div>
      }
      <div className="mt-5">
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
      <hr className="mt-4 mb-4" />
      <span>
        {products.length} Itens
      </span>
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
              <>
                <div>
                  <Counter product={item} />
                </div>
              </>
            </div>
            <hr className="mb-4 mt-4" />
          </div>
        ))
      }
      <div className="bg-[#F9F9FB] my-5 p-5">
        <div className="flex justify-between">
          <span>
            Subtotal
          </span>
          <span>
            {subTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="flex justify-between my-2 border-opacity-60">
          <span>
            Frete
          </span>
          <span>
            {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="flex justify-between my-2 border-opacity-60 border-b-2 border-dashed border-[#96A3AB] pb-3">
          <span>
            Desconto
          </span>
          <span>
            {discount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            Total
          </span>
          <span className="text-[#FB9400] font-semibold text-[24px]" >
            {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <Button invertColors={false} handleFunction={handleFinishOrder} buttonText="Finalizar Pedido" />
      </div>
    </div>
  );
};

export default Home;

type Props = {
  tenant: Tenant;
  address: Address;
  products: Product[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = await context.query;
  const session = await unstable_getServerSession(
    context.req, context.res, authOptions
  );

  const api = await useApi(tenantSlug as string);
  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } };
  };

  if (!session) {
    return { redirect: { destination: `${tenantSlug}/singin`, permanent: false } };
  };

  const products = await api.getProductsBag(session.user.id.toString());
  const address = await api.getAddress(session.user.id);

  return {
    props: {
      tenant,
      products,
      address
    }
  };
};