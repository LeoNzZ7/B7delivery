import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { B7BurguerTitle } from "../../components/SVGS/b7BurguerTItle";
import { B7PizzaTitle } from "../../components/SVGS/b7PizzaTitle";
import { Email } from "../../components/SVGS/email";
import { useAppContext } from "../../contexts/app.content";
import { useApi } from "../../libs/useApi";
import { Tenant } from "../../types/tenant";

const Forgot = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const [emailSent, setEmailSent] = useState(true);

  useEffect(() => {
    setTenant(data.tenant);
  });

  return (
    <>
      {!emailSent &&
        <div>
          <head>
            <title>Esqueci a senha | {data.tenant.name}</title>
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
            <span className="text-center mb-5 mt-10 text-[24px] font-semibold h-[39px text-[#1B1B1B]" >Esqueceu a senha?</span>
            <span className="text-[#1B1B1B] w-[308px] text-center" >
              Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir  a sua senha.
            </span>
            <div className="flex w-full mt-6">
              <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
              <div style={{ backgroundColor: tenant?.mainColor }} className="w-[55%] h-[3px]"></div>
              <div className="w-[22.5%] h-[3px] bg-[#F9F9FB]"></div>
            </div>
            <div className="mt-5 w-full" >
              <Input type="email" placeholder="Digite seu email" />
              <Button invertColors={false} buttonText="Enviar" />
            </div>
          </div>
        </div>
      }
      {emailSent &&
        <div>
        <head>
          <title>Esqueci a senha | {data.tenant.name}</title>
        </head>
        <Header />
        <div className="flex flex-col items-center justify-center p-6" >
          <div className="mt-10" >
            <Email color={tenant?.mainColor as string} />
          </div>
          <span className="text-center mb-5 mt-10 text-[24px] font-semibold h-[39px text-[#1B1B1B]">Verifique seu email</span>
          <span className="text-[#1B1B1B] w-[308px] text-center" >
            Enviamos as instruções para recuperação de senha para o seu e-mail.
          </span>
          <div className="mt-5 w-full" >
            <Button invertColors={false} buttonText="Fazer login" />
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Forgot;

type Props = {
  tenant: Tenant;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = await context.query;
  
  const api = await useApi(tenantSlug as string);
  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  };

  return {
    props: {
      tenant
    }
  };
};