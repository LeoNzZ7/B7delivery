import { ClipboardText, ForkKnife, Gear, Heart, ShoppingBagOpen, SignOut, X } from "phosphor-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useAppContext } from "../contexts/app.content";
import { useRouter } from "next/router";

type props = {
  openMenu: boolean;
  setOpenMenu: (isOpenMenu: boolean) => void;
}

export const Menu = ({ openMenu, setOpenMenu,  }: props) => {
  const { tenant } = useAppContext();
  const { data: session } = useSession();

  return(
    <div className=
      {`fixed top-0 px-[30px] ${openMenu ? "left-0" : "left-1000"} ${openMenu ? "translate-x-0" : "translate-x-[1000px]"} bg-white h-screen w-screen transition-menu`}>
      <div className="flex justify-between mt-[56px] pl-[30px]">
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
          <div>
            <span className="font-medium text-[24px] block">{session.user?.name}</span>
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
          <Link href="b7burguer/bag">Sacola</Link>
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
        {session &&
          <div className="flex items-center text-[#6A7D8B] mt-10 text-[16px]">
            <SignOut size={16} className="mr-4" />
            <span onClick={() => signOut()} >Sair</span>
          </div>
        }
      </div>
    </div>
  )
}