import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { useAppContext } from "../contexts/app.content";

type Props = {
  title?: string;
  subTitle?: string;
}

export const Header = ({ title, subTitle }: Props) => {
  const { tenant } = useAppContext();

  const router = useRouter()

  return (
    <div className="px-9 mt-[76px]">
      <div className="flex" >
        <button onClick={() => router.back()} >
          <ArrowLeft style={{ color: tenant?.mainColor }} size={24} className='w-6' />
        </button>
        {title &&
          <div className="flex flex-1 flex-col justify-center items-center mt-[-12px]">
            <h1 className="font-semibold text-[24px] h-7">{title}</h1>
            <span className="text-[13px] text-[#6A7D8B] text-center">{subTitle}</span>
          </div>
        }
      </div>
      {title &&
        <hr className="mt-2" />
      }
    </div>
  );
}