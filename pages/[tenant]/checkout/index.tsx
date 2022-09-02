import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CaretRight, MapPin } from "phosphor-react";
import { useState } from "react";
import { Button } from "../../../components/button";
import { Counter } from "../../../components/counter";
import { useApi } from "../../../libs/useApi";
import { Address } from "../../../types/addresses";
import { Product } from "../../../types/product";
import { Tenant } from "../../../types/tenant";
import { authOptions } from "../../api/auth/[...nextauth]";

const Home = (data: Props) => {
  const router = useRouter();

  const [address, setAddress] = useState<Address>(data.address);

  console.log("Endereço:", data.address)
  console.log("tenant:", data.tenant)

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
          <div className="h-[61px] mt-2 rounded-md bg-[#F9F9FB] flex items-center justify-around">
            <div className="bg-white w-12 h-12 flex items-center justify-center rounded-md">
              <MapPin size={24} weight="bold" style={{ color: data.tenant.mainColor }} />
            </div>
            <div className="text-[15px]" >
              {address.house_number} - {address.street} - {address.city.slice(0, 4)}...
            </div>
            <div>
              <CaretRight size={24} weight="bold" style={{ color: data.tenant.mainColor }} />
            </div>
          </div>
        </Link>
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
    return { redirect: { destination: '/singin', permanent: false } };
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