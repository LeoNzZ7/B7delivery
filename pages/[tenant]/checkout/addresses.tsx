import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { Header } from "../../../components/header";
import { useApi } from "../../../libs/useApi";
import { Address } from "../../../types/addresses";
import { Tenant } from "../../../types/tenant";
import { authOptions } from "../../api/auth/[...nextauth]";

const Addresses = (data: Props) => {
  console.log(data.addresses);

  return(
    <div>
      <Head>
        <title>
          {data.tenant.name} | Endereços
        </title>
      </Head>
      <div>
        <Header title="Meus endereços" />
      </div>
    </div>
  );
};

export default Addresses;

type Props = {
  tenant: Tenant;
  addresses: Address;
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