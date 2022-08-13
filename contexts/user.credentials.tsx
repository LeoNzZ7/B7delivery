import { createContext, ReactNode, useContext, useState } from "react";

type userCrendentialsType = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

const defaultValues: userCrendentialsType = {
  email: "",
  password: "",
  setEmail: (email: string) => null,
  setPassword: (password: string) => null
};

const userCrendentials = createContext<userCrendentialsType>(defaultValues);
export const useUserCrendtialsContext = () => useContext(userCrendentials);

type Props = {
  children: ReactNode;
};

export const UserCrendentialsContextProvider = ({ children }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <userCrendentials.Provider value={{ email, password, setEmail, setPassword }} >
      {children}
    </userCrendentials.Provider>
  );
};