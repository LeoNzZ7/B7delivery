import { MagnifyingGlass } from "phosphor-react";

const Home = () => {
  return(
    <div className="px-6 pt-[50px] pb-[30px] bg-[#F9F9FB]" >
      <header>
       <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <span className="text-[24px] font-semibold text-[#1B1B1B] mb-1" >Seja bem vindo👋</span>
            <span className="text-[15px] text-[#979797]" >O que deseja para hoje?</span>
          </div>
          <div className="flex flex-col w-[18px] h-[16px]" >
            <div className="bg-[#FB9400] w-full h-[2px]"></div>
            <div className="bg-[#FB9400] w-full h-[2px] my-1"></div>
            <div className="bg-[#FB9400] w-full h-[2px]"></div>
          </div>
       </div>
       <div className="w-full h-[60px] mt-6"> 
          <div className="flex items-center h-full w-white">
            <form className="w-full bg-white p-2 rounded-sm">
              <label className="flex justify-center items-cente">
                <span className="flex justify-center items-center h-[48] w-[48] bg-[#F9F9F9] p-2 rounded-sm">
                  <MagnifyingGlass className="text-[#FB9400]" size={32} />
                </span>
                <input type='search' className="w-full border-0 focus:ring-0" placeholder="Digite o nome do burguer" />
              </label>
            </form>
          </div>
       </div>
      </header>
      <div>

      </div>
    </div>
  );
}

export default Home;