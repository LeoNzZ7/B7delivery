import axios from "axios";
import { useRouter } from "next/router";
import { MapPin, PencilSimpleLine, Trash } from "phosphor-react";
import { useState } from "react";
import { useAppContext } from "../contexts/app.content";
import { Address } from "../types/addresses";

type props = {
  data: Address
};

export const AddressesComponent = ({ data }: props) => {
  const { tenant } = useAppContext();
  const [openMenu, setOpenMenu] = useState(false);

  const router = useRouter();

  const handleDeleteAddresses = async () => {
    const req = await axios.delete(`/api/address/${data.id}`);

    if(req.status === 200) {
      router.reload();
    };
  };

  return (
    <div className="px-6">
      <div className="flex justify-between border-b border-[#1B1B1B] border-opacity-10 p-5 text-[15px]" >
        <MapPin size={24} className="mr-2" style={{ color: tenant?.mainColor }} />
        <div className="flex-1">
          {data.house_number} - {data.street} - {data.city.slice(0, 4)}...
        </div>
        <div className="flex flex-col items-center justify-evenly" onClick={() => setOpenMenu(!openMenu)}>
          <div className="h-1 w-1 bg-[#6A7D8B] rounded-full"></div>
          <div className="h-1 w-1 bg-[#6A7D8B] rounded-full"></div>
          <div className="h-1 w-1 bg-[#6A7D8B] rounded-full"></div>
        </div>
        <div>
          {openMenu &&
            <div className="flex flex-col items-center justify-evenly w-[130px] h-[110px] bg-[#FFF] drop-shadow-xl shadow-[#F9F9FB] fixed right-14">
              <div className="flex items-center" >
                <PencilSimpleLine size={24} className="mr-5 text-[#96A3AB]" />
                <span>
                  Editar
                </span>
              </div>
              <div className="flex items-center" onClick={handleDeleteAddresses} > 
                <Trash size={24} className="mr-5 text-[#96A3AB]" />
                <span>
                  Excluir  
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}