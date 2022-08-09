import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { useAppContext } from "../../contexts/app.content";
import { Product } from "../../types/product";
import { Tenant } from "../../types/tenant";

const Bag = (data: Props) => {
  const { tenant } = useAppContext();

  const router = useRouter();

  return(
    <div className="px-6">
      <div className="mt-14 flex items-center">
        <button onClick={() => router.back()} style={{ color: "#f00" }} >
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
      <hr className="mt-4" />
    </div>
  )  
}

export default Bag;

type Props = {
  tenant: Tenant;
  products: Product[];
};
