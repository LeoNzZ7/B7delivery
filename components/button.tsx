import Link from "next/link";
import { useAppContext } from "../contexts/app.content";

type Props = {
  invertColors: boolean;
  buttonText: string;
  function?: () => void;
  link?: string;
}

export const Button = ({ invertColors, buttonText, link }: Props) => {
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
      className='w-full h-[60px] border-[1px] rounded mt-5'
      style={{ backgroundColor: invertColors ? '#FFF' : tenant?.mainColor, borderColor: invertColors ? tenant?.mainColor : '#FFF', color: invertColors ? tenant?.mainColor : '#FFF' }}
    >
      {buttonText}
    </button>
  )
}