import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type SidebarProps = {
  isOpenAside: boolean,
  setIsOpenAside: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarProps>({
  isOpenAside: false,
  setIsOpenAside: () => {}
})

export function SidebarProvider ({children}: {children: ReactNode}) {
  const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

  return (
    <SidebarContext.Provider value={{isOpenAside, setIsOpenAside}}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => useContext(SidebarContext)