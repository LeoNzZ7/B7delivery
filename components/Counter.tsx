import { useState } from "react"
import { useAppContext } from "../contexts/app.content"

export const Counter = () => {
  const { tenant } = useAppContext();

  const [amount, setAmount] = useState(1)

  const handleCounterSum = () => {
    setAmount(amount + 1);
  }

  const handleCountersubtract = () => {
    if(amount > 0) {
      setAmount(amount - 1);
    }
  }

  return(
    <div className="flex w-[140px] justify-around items-center mt-3 h-12"> 
      <button 
      className=
      {`bg-[#F2F4F5] h-full flex-1 rounded-l-md text-[#96A3AB]`}
      onClick={handleCountersubtract}
      >-</button>
      <div style={{ color: tenant?.mainColor }} className="h-full flex flex-1 justify-center items-center font-bold">
        {amount < 10 &&
          0
        }
        {amount}
      </div>
      <button 
      className=
      {`bg-[#F2F4F5] h-full flex-1 rounded-r-md text-[#96A3AB]`}
      onClick={handleCounterSum}
      >+</button>
    </div>
  )
}