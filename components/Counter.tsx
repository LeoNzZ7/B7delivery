import { useState } from "react"
import { useAppContext } from "../contexts/app.content"

export const Counter = () => {
  const { tenant } = useAppContext();

  const [amount, setAmount] = useState(1)

  const handleCounterSum = () => {
    setAmount(amount + 1);
  }

  const handleCountersubtract = () => {
    if(amount > 1) {
      setAmount(amount - 1);
    }
  }

  return(
    <div className="flex w-[140px] justify-around items-center mt-3 h-12"> 
      <button 
      className=
        {`bg-[#F2F4F5] h-full flex-1 font-semibold text-[24px] rounded-l-md text-[#96A3AB] ${tenant?.slug === 'b7burger' ? 'hover:bg-[#FB9400]' : 'hover:bg-[#6AB70A]'}`}
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
        {`bg-[#F2F4F5] h-full flex-1 font-semibold text-[24px] rounded-r-md text-[#96A3AB] ${tenant?.slug === 'b7burger' ? 'hover:bg-[#FB9400]' : 'hover:bg-[#6AB70A]'}`}
      onClick={handleCounterSum}
      >+</button>
    </div>
  )
}