import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { Button } from "../../../../components/button";
import { Header } from "../../../../components/header";
import { useApi } from "../../../../libs/useApi";
import { Tenant } from "../../../../types/tenant";
import { authOptions } from "../../../api/auth/[...nextauth]";

const NewAddress = (data: Props) => {
  return (
    <div>
      <div>
        <Header title="Novo endereço" />
      </div>
      <div className="px-6" >
        <div className="mt-5" >
          <label className="flex flex-col" >
            <span>CEP</span>
            <input
              type="text"
              className={`border-0 bg-[#F9F9FB] h-[60px] rounded-md focus:ring-2 focus:ring-[#${data.tenant.mainColor}]`}
              placeholder="12345-123"
            />
          </label>
          <div className="flex justify-between items-center mt-5">
            <label>
              <span>Rua</span>
              <input
                type="text"
                className="w-[177px] h-[60px]"
              />
            </label>
            <label>
              <span>Número</span>
              <div className="flex justify-start" >
                <input
                  type="text"
                  className="w-[177px] h-[60px]"
                />
              </div>
            </label>
          </div>
          <label className="flex flex-col mt-5" >
            <span>CEP</span>
            <input type="text" />
          </label>
          <label className="flex flex-col mt-5" >
            <span>CEP</span>
            <input type="text" />
          </label>
          <label className="flex flex-col mt-5" >
            <span>CEP</span>
            <input type="text" />
          </label>
          <label className="flex flex-col mt-5" >
            <span>CEP</span>
            <input type="text" />
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

  const addresses = await api.getAddresses(session.user.id);

  return {
    props: {
      tenant,
      addresses
    }
  };
};