import Link from "next/link";
import { useAppContext } from "../contexts/app.content";
import { Product } from "../types/product";
import { Counter } from "./counter";

type Props = {
  data: Product;
  ProductType: "home" | "cart" | "order";
}

export const ProductItem = ({ data, ProductType }: Props) => {
  const { tenant } = useAppContext();

  return (
    <>
      {ProductType === "home" &&
        <Link href={`${tenant?.slug}/product/${data.id}`} >
          <a href="" className="flex flex-col">
            <div style={{ backgroundColor: tenant?.secondColor }} className={`h-[80px] rounded-t-xl`}></div>
            <div className="h-[110px] flex flex-col px-2 rounded-b-xl drop-shadow-xl bg-white">
              <div className="flex justify-center items-center h-[50px]">
                <img src={data.image} className="w-[70%] h-auto mt-[-75px]" alt="" />
              </div>
              <span className="text-[8px] font-bold text-[#1B1B1B]">{data.category}</span>
              <h1 className="font-extrabold text-[18px] text-[#1B1B1B]">{data.name}</h1>
              <span style={{ color: tenant?.mainColor }} className={`text-[15px] font-bold`}>{data.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </a>
        </Link>
      }
      {ProductType === "cart" &&
        <div>
          <div className="flex items-center justify-between h-[85px] w-[373px]">
            <Link href={`/${tenant?.slug}/product/${data.id}`}>
              <div className="w-[75px] h-[75px] flex justify-center items-center" >
                <img src={data.image} className="w-[85px] h-auto" />
              </div>
            </Link>
            <div className="flex flex-col flex-1 justify-between p-2" >
              <span className="text-[12px] font-medium text-[#666]">{data.category}</span>
              <span className="text-[#1B1B1B] text-[18px]">{data.name}</span>
              <span className="text-[#FB9400] text-[16px] font-semibold">
                {(data.multiplePrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <>
              <div>
                <Counter product={data} />
              </div>
            </>
          </div>
          <hr className="mb-4 mt-4" />
        </div>
      }
      {ProductType === "order" &&
        <div>
          <div className="flex items-center justify-between h-[85px] w-[373px]">
            <Link href={`/${tenant?.slug}/product/${data.id}`}>
              <div className="w-[75px] h-[75px] flex justify-center items-center" >
                <img src={data.image} className="w-[85px] h-auto" />
              </div>
            </Link>
            <div className="flex flex-col flex-1 justify-between p-2" >
              <span className="text-[12px] font-medium text-[#666]">{data.category}</span>
              <span className="text-[#1B1B1B] text-[18px]">{data.name}</span>
              <span className="text-[#FB9400] text-[16px] font-semibold">
                {(data.multiplePrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <div>
              <span style={{ color: tenant?.mainColor }} >Qnt.</span>
              <div className="w-11 h-11 border flex items-center justify-center font-bold border-[#F2F4F5] rounded" style={{ color: tenant?.mainColor }} >
                {data.quantity < 10 ? "0" : null}{data.quantity}
              </div>
            </div>
          </div>
          <hr className="mb-4 mt-4" />
        </div>
      }
    </>
  );
}