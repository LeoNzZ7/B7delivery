import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
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
      <div className="flex flex-col items-center justify-center p-6" >
        <h1 className="loginTitle text-[36px] font-extrabold">{tenant?.name}</h1>
        <span className="text-center w-[177px] h-[39px text-[#1B1B1B]" >Use suas credencias para realizar o login.</span>
        <div className="flex w-full mt-6">
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
          <div style={{ backgroundColor: tenant?.mainColor }} className="w-[55%] h-[3px]"></div>
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
        </div>
        <div className="mt-5 w-full" >
          <Input type="text" placeholder="Digite seu email" />
          <Input type="password" placeholder="Digite sua senha" />
        </div>
        <Button invertColors={false} buttonText="Entrar" />
        <span className="text-[16px] my-10" >
          Esqueceu a senha? 
          <a className="text-[16px]" style={{ color: tenant?.mainColor }} href="" >
            Clique aqui
          </a>
        </span>
        <div className="flex w-full mb-5">
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
          <div style={{ backgroundColor: tenant?.mainColor }} className="w-[55%] h-[3px]"></div>
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
        </div>
        <Button invertColors={true} buttonText="Quero me cadastrar" />
      </div>
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