import { createContext, ReactNode, useContext, useState } from "react";

type userCrendentialsType = {
  name: string
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

const defaultValues: userCrendentialsType = {
  name: "",
  email: "",
  password: "",
  setName: (name: string) => null,
  setEmail: (email: string) => null,
  setPassword: (password: string) => null
};

const userCrendentials = createContext<userCrendentialsType>(defaultValues);
export const useUserCrendtialsContext = () => useContext(userCrendentials);

type Props = {
  children: ReactNode;
};

export const UserCrendentialsContextProvider = ({ children }: Props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <userCrendentials.Provider value={{ name, email, password, setName, setEmail, setPassword }} >
      {children}
    </userCrendentials.Provider>
  );
};