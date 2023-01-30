import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface NavBarContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const NavBarContext = createContext({} as NavBarContextProps);

export function NavBarContextProvider({children}: {children: ReactNode}) {
  const {pathname} = useLocation();
  const {isOpen, onOpen, onClose} = useDisclosure();
  
  useEffect(() => {
    onClose();
  }, [pathname]);
  
  return (
    <NavBarContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </NavBarContext.Provider>
  )

}