import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { Counter } from "../../components/counter";
import { useApi } from "../../libs/useApi";
import { Product } from "../../types/product";
import { Tenant } from "../../types/tenant";
import { authOptions } from "../api/auth/[...nextauth]";

const Bag = (data: Props) => {
  const router = useRouter(); 

  const [products, setProducts] = useState<Product[]>(data.products);

  console.log(data.products);

  return (
    <div className="px-6">
      <Head>
        <title>Sácola | {data.tenant?.name}</title>
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
          <div className="flex items-center justify-between h-[85px] w-[373px]" key={index} >
            <div>
              <img src={item.image} className="w-[85px] h-auto" />
            </div>
            <div className="flex flex-col justify-between p-2" >
              <span className="text-[12px] font-medium text-[#666]">{data.products[0].category}</span>
              <span className="text-[#1B1B1B] text-[18px]">{data.products[0].name}</span>
              <span className="text-[#FB9400] text-[16px] font-semibold" >{data.products[0].price}</span>
            </div>
            <div>
              <Counter />
            </div>
          </div>
        ))
      }
      <hr className="mb-4 mt-4" />
    </div>
  )
}

export default Bag;

type Props = {
  tenant: Tenant;
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
    return { redirect: { destination: '/', permanent: false } }
  };

  if (!session) {
    return { redirect: { destination: '/singin', permanent: false } }
  }

  const products = await api.getProductsBag("1");

  return {
    props: {
      tenant,
      products
    }
  };
};