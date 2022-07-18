import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/app.content";

type Props = {
  invertColors: boolean;
  buttonText: string;
}

export const Button = ({ invertColors, buttonText }: Props) => {
  const { tenant } = useAppContext();

  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(tenant?.mainColor as string)
  }, [tenant])

  return (
    <button
      className={`w-full h-[60px] border-[1px] rounded`}
      style={{ backgroundColor: invertColors ? '#FFF' : tenant?.mainColor, borderColor: invertColors ? tenant?.mainColor : '#FFF', color: invertColors ? tenant?.mainColor : '#FFF' }}
    >
      {buttonText}
    </button>
  )
}