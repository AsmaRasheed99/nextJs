"use client";
import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

// define a tpescript type to describe an object with two properties
// setUser is a function with a type React.Dispatch<React.SetStateAction<string>> typically used for setting the state of a React component.
type userContextType =
  | {
      user: string;
      setUser: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined;

//initial value undefined
export const UserContext = createContext<userContextType>(undefined);

//Defines an interface UserProviderProps for the UserProvider component to accept children as a prop.

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// custom hook useUserContext using the useContext hook to access the values from the UserContext

export default UserProvider;
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("un auth");
  }
  return context;
}
