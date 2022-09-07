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

const Bag = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [address, setAddress] = useState<Address>(data.address);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(12.50);
  const [discount, setDiscount] = useState(5);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGetProductsBag = async () => {   
    const req = await axios.post("/api/bag/", { id_user: 5 });

    if(req.status === 200) {
      setProducts(req.data.products);
    };
  };

  useEffect(() => {
    setTenant(data.tenant);
    for (let i in products) {
      setSubTotal(Math.round(((products[i].price * products[i].quantity) * products.length) + frete));
      setDiscount(Math.round((subTotal / 100) * 5))
      setTotal(Math.round((subTotal - discount)))
    };
    handleGetProductsBag();
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
                  {((item.price * 1) * item.quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
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
      <div>
        <div className="mb-5" >
          <span className="text-[#6A7D8B]" >Calcular frete e prazo</span>
          <div className="mt-4 flex justify-between">
            <input
              className="rounded-md h-[56px] w-[80%] border-2 focus:ring-0"
              style={{ borderColor: data.tenant.mainColor }}
              placeholder="Digite o seu CEP"
              value={cep}
              onChange={e => setCep(e.target.value)}
              type="text"
            />
            <button className="uppercase border-2 font-semibold w-[56px] h-[56px] rounded-md" style={{ borderColor: data.tenant.mainColor, color: data.tenant.mainColor }} >Ok</button>
          </div>
        </div>
        <div className="bg-[#F9F9FA] h-[94px] flex flex-col justify-center items-center rounded-sm my-5" >
          <span className="text-[#6A7D8B] text-[10px] w-[85%]" >
            {address.street} - {address.city} - {address.state}
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
              {frete.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
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