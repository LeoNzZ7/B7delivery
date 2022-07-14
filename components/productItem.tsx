export const ProductItem = () => {
  return(
    <div className="flex flex-col " > 
      <div className="bg-[#FFF9F2] h-[80px] rounded-t-xl">
      </div>
      <div className="h-[110px] flex flex-col px-2 rounded-b-xl drop-shadow-xl bg-white" >
        <div className="flex justify-center" > 
          <img src="/temp/burguer001.png" className="w-[70%] h-auto mt-[-75px]"  alt="" />
        </div>
        <span className="text-[8px] font-bold text-[#1B1B1B]" >Tradicional</span>
        <h1 className="font-extrabold text-[18px] text-[#1B1B1B]" >Texas Burguer</h1>
        <span className="text-[#FB9400] text-[15px] font-bold" >R$ 25,00</span>
      </div>
    </div>
  );
}