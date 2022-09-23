import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Banner } from "../../components/banner";
import { Menu } from "../../components/menu";
import { ProductItem } from "../../components/productItem";
import { SearchInput } from "../../components/searchInput";
import { useAppContext } from "../../contexts/app.content";
import { useApi } from "../../libs/useApi";
import { Banners } from "../../types/banners";
import { Product } from "../../types/product";
import { Tenant } from "../../types/tenant";

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState<Product[]>(data.products);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (searchValue: string) => setSearchText(searchValue);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  

  useEffect(() => {
    let newFilteredProducts: Product[] = []
    for (let product of data.products) {
      if (product.name.toLocaleLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      };
    } 
    setFilteredProducts(newFilteredProducts);
  }, [searchText, openMenu]);

  return (
    <>
      <Head>
        <title>
          {data.tenant.name}
        </title>
      </Head>
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
          {!searchText &&
            <>
              {!openMenu && <Banner banners={data.banners} />}
            <div className="m-auto grid grid-cols-2 px-6 gap-6 pb-6">
                {products.map((item, index) => (
                  <ProductItem ProductType="home" data={item} key={index} />
                ))}
              </div>
            </>
          }
          {searchText &&
            <>
            <div className="m-auto grid grid-cols-2 px-6 gap-6 mt-6 pb-6">
                {filteredProducts.map((item, index) => (
                  <ProductItem ProductType="home" data={item} key={index} />
                ))}
              </div>
            </>
          }
        </div>
        <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
    </>
  );
};

export default Home;

type Props = {
  tenant: Tenant;
  banners: Banners[];
  products: Product[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = await context.query;
  const api = await useApi(tenantSlug as string);
  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  };

  const banners = await api.getBanners(tenant.id);
  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products,
      banners
    }
  };
};