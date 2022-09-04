import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button";
import { Header } from "../../../../components/header";
import { useAppContext } from "../../../../contexts/app.content";
import { useApi } from "../../../../libs/useApi";
import { Tenant } from "../../../../types/tenant";
import { authOptions } from "../../../api/auth/[...nextauth]";

const NewAddress = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [complement, setComplement] = useState("");

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  return (
    <div>
      <Head>
        <title>Novo Endereço - {data.tenant.name}</title>
      </Head>
      <div>
        <Header title="Novo endereço" />
      </div>
      <div className="px-6" >
        <div className="mt-5" >
          <label className="flex flex-col" >
            <span>CEP</span>
            <input
              type="text"
              className={`border-0 bg-[#F9F9FB] h-[60px] rounded-md focus:ring-2 focus:ring-[${tenant?.mainColor}]`}
              placeholder="Digite aqui o seu CEP"
              value={cep}
              onChange={e => setCep(e.target.value)}
            />
          </label>
          <div className="flex justify-between items-center mt-5">
            <label>
              <span>Rua</span>
              <input
                className={`border-0 bg-[#F9F9FB] max-w-[177px] h-[60px] rounded-md focus:ring-2 focus:ring-[${tenant?.mainColor}]`}
                type="text"
                placeholder="Digite aqui a sua Rua"
                value={street}
                onChange={e => setStreet(e.target.value)}
              />
            </label>
            <label>
              <span>Número</span>
              <div className="flex justify-start" >
                <input
                  className={`border-0 bg-[#F9F9FB] max-w-[177px] h-[60px] rounded-md focus:ring-2 focus:ring-[${tenant?.mainColor}]`}
                  type="text"
                  placeholder="Digite aqui o número da sua casa"
                  value={houseNumber}
                  onChange={e => setHouseNumber(e.target.value)}
                />
              </div>
            </label>
          </div>
          <label className="flex flex-col mt-5" >
            <span>Bairro</span>
            <input
              className={`border-0 bg-[#F9F9FB] h-[60px] rounded-md focus:ring-2 focus:ring-[${tenant?.mainColor}]`}
              type="text"
              placeholder="Digite aqui o seu bairro"
              value={district}
              onChange={e => setDistrict(e.target.value)}
            />
          </label>
          <label className="flex flex-col mt-5" >
            <span>Cidade</span>
            <input
              className={`border-0 bg-[#F9F9FB] h-[60px] rounded-md focus:ring-2 focus:ring-[${tenant?.mainColor}]`}
              type="text"
              placeholder="Digite aqui o sua cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label className="flex flex-col mt-5" >
            <span>Estado</span>
            <input
              className={`border-0 bg-[#F9F9FB] h-[60px] rounded-md focus:ring-2 focus:ring-[${tenant?.mainColor}]`}
              type="text"
              placeholder="Digite aqui o seu estado"
              value={cep}
              onChange={e => setState(e.target.value)}
            />
          </label>
          <label className="flex flex-col mt-5" >
            <span>Complemento</span>
            <input
              className={`border-0 bg-[#F9F9FB] h-[60px] rounded-md focus:ring-2 focus:ring-[${tenant?.mainColor}]`}
              type="text"
              placeholder="Digite aqui o complemento"
              value={cep}
              onChange={e => setComplement(e.target.value)}
            />
          </label>
          <div className="mb-10" >
            <Button buttonText="Adicionar" invertColors={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;

type Props = {
  tenant: Tenant;
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
    return { redirect: { destination: `/${tenantSlug as string}/singin`, permanent: false } };
  };

  return {
    props: {
      tenant
    }
  };
};