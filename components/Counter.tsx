import axios from "axios";
import { useEffect, useState } from "react"
import { useAppContext } from "../contexts/app.content"
import { Product } from "../types/product";

type Props = {
  product: Product;
};

export const Counter = ({ product }: Props) => {
  const { tenant } = useAppContext();
  const [amount, setAmount] = useState(product.quantity);

  const handleUpdateProduct = async () => {
    const req = await axios.put("/api/product/", { id_product: product.id, qnt: amount });
  };

  const handleCounterSum = () => {
    setAmount(amount + 1);
  };

  const handleCountersubtract = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    };
  };

  useEffect(() => {
    handleUpdateProduct();
  });

  return (
    <div className="flex w-[140px] justify-around items-center mt-3 h-12 border border-[#EEE] rounded-md">
      <button
        className=
        {`bg-[#F2F4F5] h-full flex-1 font-semibold text-[24px] rounded-l-md text-[#96A3AB] hover:text-white  ${tenant?.slug === 'b7burger' ? 'hover:bg-[#FB9400]' : 'hover:bg-[#6AB70A]'}`}
        onClick={handleCountersubtract}
      >-</button>
      <div style={{ color: tenant?.mainColor }}
        className="h-full flex flex-1 justify-center items-center font-bold">
        {amount < 10 &&
          0
        }
        {amount}
      </div>
      <button
        className=
        {`bg-[#F2F4F5] h-full flex-1 font-semibold text-[24px] rounded-r-md text-[#96A3AB] hover:text-white ${tenant?.slug === 'b7burger' ? 'hover:bg-[#FB9400]' : 'hover:bg-[#6AB70A]'}`}
        onClick={handleCounterSum}
      >+</button>
    </div>
  );
};