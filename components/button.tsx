import { useAppContext } from "../contexts/app.content";

type Props = {
  invertColors: boolean;
  buttonText: string;
}

export const Button = ({ invertColors, buttonText }: Props) => {
  const { tenant } = useAppContext();

  return (
    <button
      className='w-full h-[60px] border-[1px] rounded mt-5'
      style={{ backgroundColor: invertColors ? '#FFF' : tenant?.mainColor, borderColor: invertColors ? tenant?.mainColor : '#FFF', color: invertColors ? tenant?.mainColor : '#FFF' }}
    >
      {buttonText}
    </button>
  )
}