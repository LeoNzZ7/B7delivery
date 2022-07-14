import { MagnifyingGlass } from "phosphor-react"
import { FormEvent, FormEventHandler, useState } from "react";

type Props = {
  mainColor: string;
  onSearch: (searchValue: string) => void
}

export const SearchInput = ({ mainColor, onSearch }: Props) => {
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
    <div className={`flex items-center h-full w-white w-full bg-white p-2 rounded-md border-[1px] ${focused ? mainColor : "border-[#FFF]"}`}>
        <label className="flex justify-center items-cente">
          <button 
          onClick={() => handleSearch}
          className="flex justify-center items-center h-[48] w-[48] bg-[#F9F9F9] p-2 rounded-md">
            <MagnifyingGlass className="text-[#FB9400]" size={32} />
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