import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { Counter } from "../../components/counter";
import { useAppContext } from "../../contexts/app.content";
import { useApi } from "../../libs/useApi";
import { Address } from "../../types/addresses";
import { Product } from "../../types/product";
import { Tenant } from "../../types/tenant";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { ProductItem } from "../../components/productItem";

const Bag = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const { data: session } = useSession();

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(data.products);
  const [address, setAddress] = useState<Address>(data.address);
  const [zipCode, setZipCode] = useState("");
  const [delivery, setDelivery] = useState(12.50);
  const [discount, setDiscount] = useState(5);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGetProductsBag = async () => {
    const req = await axios.post("/api/bag/", { id_user: session?.user.id });

    if (req.status === 200) {
      setProducts(req.data.products);
    };
  };

  useEffect(() => {
    setTenant(data.tenant);

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
        <title>Sacola | {data.tenant?.name}</title>
      </Head>
      <div className="mt-14 flex items-center">
        <button onClick={() => router.back()} style={{ color: data.tenant?.mainColor as string }} >
          <ArrowLeft size={24} className="w-6" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="font-semibold text-[24px] text-[#1B1B1B]">Sacola</h1>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <span>
        {products.length} Itens
      </span>
      <hr className="mt-4 mb-4" />
      {products &&
        products.map((item, index) => (
          <ProductItem data={item} ProductType="cart" key={index} />
        ))
      }
      <div>
        {address &&
          <div>
            <div className="mb-5" >
              <span className="text-[#6A7D8B]" >Calcular frete e prazo</span>
              <div className="mt-4 flex justify-between">
                <input
                  className="rounded-md h-[56px] w-[80%] border-2 focus:ring-0"
                  style={{ borderColor: data.tenant.mainColor }}
                  placeholder="Digite o seu CEP"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  type="text"
                />
                <button className="uppercase border-2 font-semibold w-[56px] h-[56px] rounded-md" style={{ borderColor: data.tenant.mainColor, color: data.tenant.mainColor }} >Ok</button>
              </div>
            </div>
            <div className="bg-[#F9F9FA] h-[94px] flex flex-col justify-center items-center rounded-sm my-5" >
              <span className="text-[#6A7D8B] text-[10px] w-[85%]" >
                {address &&
                  <span>
                    {address.street} - {address.city} - {address.state}
                  </span>
                }
              </span>
              <div className="flex justify-between w-[85%] mt-2">
                <span className="text-black font-normal" >
                  Receba em até 20 minutos
                </span>
                <span className="font-semibold" style={{ color: data.tenant.mainColor }} >
                  R$12,50
                </span>
              </div>
            </div>
          </div>
        }
        <div className="bg-[#F9F9FB] my-5 p-5">
          <div className="flex justify-between">
            <span>
              Subtotal
            </span>
            <span>
              {products.length > 0 && <span>{subTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>}
              {products.length === 0 && <span>--</span>}
            </span>
          </div>
          <div className="flex justify-between my-2 border-opacity-60">
            <span>
              Frete
            </span>
            <span>
              {products.length > 0 && <span>{delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>}
              {products.length === 0 && <span>--</span>}
            </span>
          </div>
          <div className="flex justify-between my-2 border-opacity-60 border-b-2 border-dashed border-[#96A3AB] pb-3">
            <span>
              Desconto
            </span>
            <span>
              {products.length > 0 && <span>{discount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>}
              {products.length === 0 && <span>--</span>}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Total
            </span>
            <span className="text-[#FB9400] font-semibold text-[24px]" >
              {products.length > 0 ? total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : <span>R$ 0</span>}
            </span>
          </div>
          <Button invertColors={false} buttonText="Continuar" link={`/${data.tenant.slug}/checkout`} />
        </div>
      </div>
    </div>
  );
};

export default Bag;

type Props = {
  tenant: Tenant;
  products: Product[];
  address: Address;
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