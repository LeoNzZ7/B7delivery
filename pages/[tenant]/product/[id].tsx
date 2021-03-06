import { GetServerSideProps } from "next";
import Head from "next/head";
import { ArrowLeft, Heart } from "phosphor-react";
import { useEffect } from "react";
import { Button } from "../../../components/button";
import { Counter } from "../../../components/counter";
import { useAppContext } from "../../../contexts/app.content";
import { useApi } from "../../../libs/useApi";
import { Product } from "../../../types/product";
import { Tenant } from "../../../types/tenant";

const Product = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  });

  return (
    <div>
      <Head>
        <title>{data.product.name} | {data.tenant.name}</title>
      </Head>
      <div style={{ backgroundColor: tenant?.mainColor }} className="absolute h-[383px] w-screen" >
        <div className="px-9 mt-[70px]">
          <div className="flex justify-between" >
            <div 
            style={{ backgroundColor: tenant?.slug === "b7burguer" ? "#F08E00" : "#62A70D" }} 
            className="w-12 h-12 flex justify-center items-center rounded-md" >
              <ArrowLeft weight="bold" size={24} className='w-6 text-white' />
            </div>
            <div className="flex flex-1 flex-col justify-center items-center">
              <h1 className="font-semibold text-[24px] h-7 text-white">Produto</h1>
            </div>
            <div
              onClick={() => alert("Funcionalidade em desenvolvimento")}
              style={{ backgroundColor: tenant?.slug === "b7burguer" ? "#F08E00" : "#62A70D" }} 
              className="w-12 h-12 flex justify-center items-center rounded-md" >
              <Heart size={24} className='w-6 text-white' />
            </div>
          </div>
          <div className="flex justify-center" >
            <img className="w-auto h-[350px]" src={data.product.image} alt="" />
          </div>
        </div>
        <div className="px-5 mt-[-20px]">
          <span className="text-[16px] font-medium">{data.product.categoryName}</span>
          <h1 className="text-[40px] font-semibold" >{data.product.name}</h1>
        </div>
        <div className="px-5 flex my-5">
          <div style={{ backgroundColor: data.tenant.mainColor }} className="w-[75%] h-[2px]"></div>
          <div style={{ backgroundColor: data.tenant.secondColor }} className="w-[25%] h-[2px]"></div>
        </div>
        <div className="px-5" >
          <p className="text-[#4D4D4D] text-[16px]" >{data.product.description}</p>
        </div>
        <div className="px-5 mt-5 flex justify-between items-end">
          <div>
            <span>Quantidade</span>
            <Counter />
          </div>
          <span 
          style={{ color: tenant?.mainColor }}
          className="font-semibold text-[40px]" >
            {data.product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="px-5 flex items-center h-[150px]" >
          <Button invertColors={false} buttonText="Adicionar ?? sacOla" />
        </div>
      </div>
    </div>
  );
}

type Props = {
  product: Product;
  tenant: Tenant;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query;
  const api = useApi(tenantSlug as string)

  const tenant = api.getTenant()
  const product = api.getProduct(id as string);

  return {
    props: {
      tenant,
      product
    }
  };
};


export default Product;