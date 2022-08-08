import { GetServerSideProps } from "next";
import Link from "next/link";
import { ClipboardText, ForkKnife, Gear, Heart, ShoppingBagOpen, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Banner } from "../../components/banner";
import { ProductItem } from "../../components/productItem";
import { SearchInput } from "../../components/searchInput";
import { useAppContext } from "../../contexts/app.content";
import { useApi } from "../../libs/useApi";
import { Product } from "../../types/product";
import { Tenant } from "../../types/tenant";

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  });

  const [products, setProducts] = useState<Product[]>(data.products);
  const [isLogged, setIsLogged] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleSearch = (searchValue: string) => {
    console.log(searchValue)
  };

  return (
    <>
      <div className="max-w-screen-sm overflow-hidden">
        <div>
          <header className="px-6 pt-[50px] pb-[30px] bg-[#F9F9FB]">
            <div className="flex justify-between items-center ">
              <div className="flex flex-col">
                <span className="text-[24px] font-semibold text-[#1B1B1B] mb-1">Seja bem vindo👋</span>
                <span className="text-[15px] text-[#979797]" >O que deseja para hoje?</span>
              </div>
              <div className="flex flex-col w-[18px] h-[16px]" onClick={() => setOpenMenu(!openMenu)} >
                <div style={{ backgroundColor: tenant?.mainColor }} className='w-full h-[2px]'></div>
                <div style={{ backgroundColor: tenant?.mainColor }} className='w-full h-[2px] my-1'></div>
                <div style={{ backgroundColor: tenant?.mainColor }} className='w-full h-[2px]'></div>
              </div>
            </div>
            <div className="w-full h-[60px] mt-6">
              <SearchInput
                onSearch={handleSearch}
              />
            </div>
          </header>
          {!openMenu && <Banner />}
          <div className="m-auto grid grid-cols-2 px-6 gap-6">
            {products.map((item, index) => (
              <ProductItem data={item} key={index} />
            ))}
          </div>
        </div>
        <div className=
          {`fixed top-0 px-[30px] ${openMenu ? "left-0" : "left-1000"} ${openMenu ? "translate-x-0" : "translate-x-[1000px]"} bg-white h-screen w-screen transition-menu`}>
          <div className="flex justify-between mt-[56px] pl-[30px]">
            {!isLogged &&
              <button
                className="w-[72%] h-[56px] rounded-md font-bold text-white"
                style={{ backgroundColor: tenant?.mainColor as string }} >
                Fazer Login
              </button>
            }
            {isLogged &&
              <div>
                <span className="font-medium text-[24px] block">Leonardo Nunes</span>
                <span className="text-[#96A3AB] text-[18px]">Ultimo pedido há 2 semanas</span>
              </div>
            }
            <div className="w-6 h-6" onClick={() => setOpenMenu(!openMenu)} >
              <X size={24} weight="bold" style={{ color: tenant?.mainColor }} />
            </div>
          </div>
          <div className="flex mt-10">
            <div className="bg-[#E2E2E2] h-[2px] w-[9%]"></div>
            <div style={{ backgroundColor: tenant?.mainColor }} className="h-[2px] w-[66%]"></div>
            <div className="bg-[#E2E2E2] h-[2px] w-[25%]"></div>
          </div>
          <div className="pl-[30px]">
            <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
              <ForkKnife size={16} className="mr-4" />
              <Link href="" >Cardápio</Link>
            </div>
            <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
              <ShoppingBagOpen size={16} className="mr-4" />
              <Link href="" >Sacola</Link>
            </div>
            <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
              <Heart size={16} className="mr-4" />
              <Link href="" >Favoritos</Link>
            </div>
            <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
              <ClipboardText size={16} className="mr-4" />
              <Link href="" >Meus pedidos</Link>
            </div>
            <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
              <Gear size={16} className="mr-4" />
              <Link href="" >Configurações</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

type Props = {
  tenant: Tenant;
  products: Product[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);
  const tenant = api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  };

  const products = api.getAllProducts();

  return {
    props: {
      tenant,
      products
    }
  };
};