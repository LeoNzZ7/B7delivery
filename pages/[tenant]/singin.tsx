import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { B7BurguerTitle } from "../../components/SVGS/b7BurguerTItle";
import { B7PizzaTitle } from "../../components/SVGS/b7PizzaTitle";
import { useAppContext } from "../../contexts/app.content";
import { UseApi } from "../../libs/useApi";
import { Tenant } from "../../types/tenant";

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
        <div className="mb-10" > 
          {data.tenant.slug === 'b7burguer' &&
            <B7BurguerTitle />
          }
          {data.tenant.slug === 'b7pizza' &&
            <B7PizzaTitle />
          }
        </div>
        <span className="text-center w-[177px] h-[39px text-[#1B1B1B]" >Use suas credencias para realizar o login.</span>
        <div className="flex w-full mt-6">
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
          <div style={{ backgroundColor: tenant?.mainColor }} className="w-[55%] h-[3px]"></div>
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
        </div>
        <div className="mt-10 w-full" >
          <Input type="email" placeholder="Digite seu email" />
          <Input type="password" placeholder="Digite sua senha" />
        </div>
        <Button invertColors={false} buttonText="Entrar" />
        <div className="flex items-center my-10" >
          <span className="text-[16px] mr-2" >
            Esqueceu a senha?
          </span>
          <Link className="ml-2" href={`http://localhost:3000/${tenant?.slug}/forgot`} >
            <span className="text-[16px]" style={{ color: tenant?.mainColor }} >
              Clique aqui
            </span>
          </Link>
        </div>
        <div className="flex w-full mb-5">
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
          <div style={{ backgroundColor: tenant?.mainColor }} className="w-[55%] h-[3px]"></div>
          <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
        </div>
        <Button invertColors={true} buttonText="Quero me cadastrar" link={`http://localhost:3000/${tenant?.slug}/singup`} />
      </div>
    </div>
  );
};

export default Login;

type Props = {
  tenant: Tenant;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;

  const api = UseApi(tenantSlug as string);
  const tenant = api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  };

  return {
    props: {
      tenant
    }
  };
};