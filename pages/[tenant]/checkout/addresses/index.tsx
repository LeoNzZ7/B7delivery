import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddressesComponent } from "../../../../components/addresses";
import { Button } from "../../../../components/button";
import { Header } from "../../../../components/header";
import { useAppContext } from "../../../../contexts/app.content";
import { useApi } from "../../../../libs/useApi";
import { Address } from "../../../../types/addresses";
import { Tenant } from "../../../../types/tenant";
import { authOptions } from "../../../api/auth/[...nextauth]";

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  return (
    <div className="flex justify-between flex-col h-screen" >
      <Head>
        <title>
          {data.tenant.name} | Endereços
        </title>
      </Head>
      <div>
        <div>
          <Header title="Meus Endereços" />
        </div>
        {data.addresses.map((item, index) => (<AddressesComponent data={item} key={index} />))}
      </div>
      <div className="mb-10 px-6">
        <Button buttonText="Novo endereço" invertColors={false} link={`/${data.tenant.slug}/checkout/addresses/newaddress`} />
      </div>
    </div>
  );
};

export default Home;

type Props = {
  tenant: Tenant;
  addresses: Address[];
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
    return { redirect: { destination: `/${tenantSlug as string}`, permanent: false } };
  };

  const addresses = await api.getAddresses(session.user.id);

  return {
    props: {
      tenant,
      addresses
    }
  };
};