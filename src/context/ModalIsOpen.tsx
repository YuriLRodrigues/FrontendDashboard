import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type ModalProps = {
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

const ModalContext = createContext({} as ModalProps)

export function ModalProvider({children}: {children: ReactNode}) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  
  return (
    <ModalContext.Provider value={{setModalIsOpen, modalIsOpen}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalOpen = () => useContext(ModalContext)