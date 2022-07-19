import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { useAppContext } from "../contexts/app.content";

type Props = {
  type: "text" | "email" | "password"; 
  placeholder: string;
}

export const Input = ({ type, placeholder }: Props) => {
  const { tenant } = useAppContext();
  const [focused, setfocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex mt-5 items-center">
      {type === 'text' &&
        <input
          onFocus={() => setfocused(true)}
          onBlur={() => setfocused(false)}
          type={type}
          style={{ border: focused ? `1px solid ${tenant?.mainColor}` : '1px solid transparent' }}
          className='w-full h-[60px] mt-5 rounded focus:ring-0 bg-[#F9F9FB] transition-colors'
          placeholder={placeholder}
          value={name}
          onChange={e => setEmail(e.target.value)}
        />
      }
      {type === 'email' &&
        <input
          onFocus={() => setfocused(true)}
          onBlur={() => setfocused(false)}
          type={type}
          style={{ border: focused ? `1px solid ${tenant?.mainColor}` : '1px solid transparent' }}
          className='w-full h-[60px] rounded focus:ring-0 bg-[#F9F9FB] transition-colors'
          placeholder={placeholder}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      }
      {type === 'password' && showPassword === false &&
        <>
          <input
            onFocus={() => setfocused(true)}
            onBlur={() => setfocused(false)}
            type={showPassword ? 'text' : type}
            className='w-full h-[60px] rounded focus:ring-0 bg-[#F9F9FB] transition-colors'
            style={{ border: focused ? `1px solid ${tenant?.mainColor}` : '1px solid transparent' }}
            placeholder={placeholder}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className={`bg-[#F9F9FB] h-[50px] p-2 ml-[-65px] rounded`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword &&
              <Eye size={24} />
            }
          </button>
        </>
      }
      {showPassword &&
        <>
          <input
            onFocus={() => setfocused(true)}
            onBlur={() => setfocused(false)}
            type={showPassword ? 'text' : type}
            className='w-full h-[60px] rounded focus:ring-0 bg-[#F9F9FB] transition-colors'
            style={{ border: focused ? `1px solid ${tenant?.mainColor}` : '1px solid transparent' }}
            placeholder={placeholder}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className={`bg-[#F9F9FB] h-[50px] p-2 ml-[-65px] rounded`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword &&
              <EyeSlash size={24} />
            }
          </button>
        </>
      }
    </div >
  )
}