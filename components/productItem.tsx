import Link from "next/link";
import { Product } from "../types/product";

type Props = {
  data: Product;
  mainColor: string;
  secondColor: string;
}

export const ProductItem = ({ data, mainColor, secondColor }: Props) => {
  return(
    <Link href={`/product/1`} >
      <a href="" className="flex flex-col"> 
        <div className={`bg-[${secondColor}] h-[80px] rounded-t-xl`}></div>
        <div className="h-[110px] flex flex-col px-2 rounded-b-xl drop-shadow-xl bg-white">
          <div className="flex justify-center"> 
            <img src={data.image} className="w-[70%] h-auto mt-[-75px]"  alt=""/>
          </div>
          <span className="text-[8px] font-bold text-[#1B1B1B]">{data.categoryName}</span>
          <h1 className="font-extrabold text-[18px] text-[#1B1B1B]">{data.name}</h1>
          <span className={`text-[${mainColor}] text-[15px] font-bold`}>{data.price}</span>
        </div>
      </a>
    </Link>
  );
}