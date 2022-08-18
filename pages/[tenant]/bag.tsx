import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { Counter } from "../../components/counter";
import { useAppContext } from "../../contexts/app.content";
import { Product } from "../../types/product";
import { Tenant } from "../../types/tenant";

const Bag = (data: Props) => {
  const { tenant } = useAppContext();

  const router = useRouter();

  return(
    <div className="px-6">
      <Head>
        <title>Sácola | {tenant?.name}</title>
      </Head>
      <div className="mt-14 flex items-center">
        <button onClick={() => router.back()} style={{ color: tenant?.mainColor as string }} >
          <ArrowLeft size={24} className="w-6" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="font-semibold text-[24px] text-[#1B1B1B]">Sacola</h1>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <span>
        0 Itens
      </span>
      <hr className="mt-4 mb-4" />
      <div className="flex items-center justify-between h-[85px] w-[373px]" >
        <div>
          <img src="/images/B7delivery/img - Golden Burger.png" className="w-[85px] h-auto" />
        </div>
        <div className="flex flex-col justify-between p-2" >
          <span className="text-[12px] font-medium text-[#666]">Tradicional</span>
          <span className="text-[#1B1B1B] text-[18px]">Golden Burger</span>
          <span className="text-[#FB9400] text-[16px] font-semibold" >25 reais</span>
        </div>
        <div>
          <Counter />
        </div>
      </div>
      <hr className="mb-4 mt-4" />
    </div>
  )  
}

export default Bag;

type Props = {

  tenant: Tenant;
  products: Product[];
};

