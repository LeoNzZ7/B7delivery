import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { Header } from "../../components/header";
import { useAppContext } from "../../contexts/app.content";
import { UseApi } from "../../libs/useApi";
import { Tenant } from "../../types/tenatn";

const Login = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  });

  return (
    <div>
      <head>
        <title>Login | {data.tenant.name}</title>
      </head>
      <Header />
    </div>
  );
};

export default Login;

type Props = {
  tenant: Tenant;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = UseApi();

  const { tenant: tenantSlug } = context.query;
  const tenant = api.getTenant(tenantSlug as string);

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  };

  return {
    props: {
      tenant
    }
  };
};