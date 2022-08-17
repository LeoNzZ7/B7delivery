import Link from "next/link";
import { useAppContext } from "../contexts/app.content";
import { Product } from "../types/product";

type Props = {
  data: Product;
}

export const ProductItem = ({ data }: Props) => {
  const { tenant } = useAppContext();

  return(
    <Link href={`${tenant?.slug}/product/${data.id}`} >
      <a href="" className="flex flex-col"> 
        <div style={{ backgroundColor: tenant?.secondColor }} className={`h-[80px] rounded-t-xl`}></div>
        <div className="h-[110px] flex flex-col px-2 rounded-b-xl drop-shadow-xl bg-white">
          <div className="flex justify-center items-center h-[50px]"> 
            <img src={data.img} className="w-[70%] h-auto mt-[-75px]"  alt=""/>
          </div>
          <span className="text-[8px] font-bold text-[#1B1B1B]">{data.categoryName}</span>
          <h1 className="font-extrabold text-[18px] text-[#1B1B1B]">{data.name}</h1>
          <span style={{ color: tenant?.mainColor }} className={`text-[15px] font-bold`}>{data.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
        </div>
      </a>
    </Link>
  );
}