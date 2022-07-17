import { MagnifyingGlass } from "phosphor-react"
import { useState } from "react";
import { useAppContext } from "../contexts/app.content";

type Props = {
  onSearch: (searchValue: string) => void
}

export const SearchInput = ({ onSearch }: Props) => {
  const { tenant } = useAppContext();

  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if(event.code === 'ENTER') {
      onSearch(searchValue)
    };
  };

  const handleSearch = (searchValue: string) => {
    onSearch(searchValue);
  };

  return(
    <div style={{ borderColor: focused ? tenant?.mainColor : '#FFF' }} className={`flex items-center h-full w-white w-full bg-white p-2 rounded-md border-[1px]`}>
        <label className="flex justify-center items-cente">
          <button 
          onClick={() => handleSearch}
          className="flex justify-center items-center h-[48] w-[48] bg-[#F9F9F9] p-2 rounded-md">
            <MagnifyingGlass style={{ color: tenant?.mainColor }} size={32} />
          </button>
          <input 
            type='text' 
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyUp={handleKeyUp}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="w-full border-0 focus:ring-0" 
            placeholder="Digite o nome do burguer" />
        </label>
    </div>
  );
}