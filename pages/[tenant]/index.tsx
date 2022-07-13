import { Banner } from "../../components/banner";
import { SearchInput } from "../../components/searchInput";

const Home = () => {
  const handleSearch = (searchValue: string) => {
    console.log(searchValue)
  };

  return (
    <div>
      <header className="px-6 pt-[50px] pb-[30px] bg-[#F9F9FB]">
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
          <SearchInput
            mainColor="#FB9400"
            onSearch={handleSearch}
          />
        </div>
      </header>
      <div>
        <Banner />
      </div>
    </div>
  );
}

export default Home;