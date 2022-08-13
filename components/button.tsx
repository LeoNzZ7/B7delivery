import Link from "next/link";
import { useAppContext } from "../contexts/app.content";

type Props = {
  invertColors: boolean;
  buttonText: string;
  handleFunction?: () => void;
  link?: string;
}

export const Button = ({ invertColors, buttonText, handleFunction, link }: Props) => {
  const { tenant } = useAppContext();

  if (link) {
    return (
      <Link href={link} >
        <span
          className='w-full h-[60px] border-[1px] rounded mt-5'
          style={{ backgroundColor: invertColors ? '#FFF' : tenant?.mainColor, borderColor: invertColors ? tenant?.mainColor : '#FFF', color: invertColors ? tenant?.mainColor : '#FFF' }}
        >
          {buttonText}
        </span>
      </Link>
    )
  }

  return (
    <button
      onClick={handleFunction}
      className='w-full h-[60px] border-[1px] rounded mt-5'
      style={{ backgroundColor: invertColors ? '#FFF' : tenant?.mainColor, borderColor: invertColors ? tenant?.mainColor : '#FFF', color: invertColors ? tenant?.mainColor : '#FFF' }}
    >
      {buttonText}
    </button>
  )
}