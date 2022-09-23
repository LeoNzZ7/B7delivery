import { ClipboardText, ForkKnife, Gear, Heart, ShoppingBagOpen, SignOut, X } from "phosphor-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useAppContext } from "../contexts/app.content";
import axios from "axios";
import { OrderStatus } from "../types/ordersStatues";
import { useState } from "react";


type props = {
  openMenu: boolean;
  setOpenMenu: (isOpenMenu: boolean) => void;
};

export const Menu = ({ openMenu, setOpenMenu }: props) => {
  const { tenant } = useAppContext();

  const { data: session } = useSession()

  const [orderStatus, setOrderStatus] = useState<OrderStatus>();
  const [lastOrderDate, setLastOrderDate] = useState("")

  /* const handleGetOrderStatus = async () => {
    if (session && !orderStatus) {
      const req = await axios.post("/api/orders/lastorderstatus", { id_user: session.user.id });

      setOrderStatus(req.data);
    };
  };

  useState(() => {
    handleGetOrderStatus()
  });

  const date = new Date(orderStatus?.created_at as Date)
  const orderDateFormatted = format(date, "' 'd'/'MM'/'yyyy' - ' k':'mm", {
    locale: ptBR,
  }); */

  return (
    <div>
      <div
        className=
        {`fixed top-0 px-[30px] ${openMenu ? "left-0" : "left-1000"} ${openMenu ? "translate-x-0" : "translate-x-[1000px]"} bg-white h-screen w-screen transition-menu`}>
        <div className="flex justify-between items-center mt-[56px] pl-[30px]">
          {!session &&
            <Link href={`${tenant?.slug as string}/singin`}>
              <button
                className="w-[72%] h-[56px] rounded-md font-bold text-white"
                style={{ backgroundColor: tenant?.mainColor as string }} >
                Fazer Login
              </button>
            </Link>
          }
          {session &&
            <div className="flex" >
              <span className="font-medium text-[24px]">{session.user?.name}</span>
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
            <Link href={session ? `/${tenant?.slug}/bag` : `/${tenant?.slug}/singin`}>Sacola</Link>
          </div>
          <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
            <Heart size={16} className="mr-4" />
            <Link href="" >Favoritos</Link>
          </div>
          <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
            <ClipboardText size={16} className="mr-4" />
            <Link href={session ? `/${tenant?.slug}/orders` : `/${tenant?.slug}/singin`} >Meus pedidos</Link>
          </div>
          <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
            <Gear size={16} className="mr-4" />
            <Link href="" >Configurações</Link>
          </div>
          {session &&
            <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
              <SignOut size={16} className="mr-4" />
              <span onClick={() => signOut()} >Sair</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}