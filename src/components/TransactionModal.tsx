import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  title: string, 
  children: ReactNode
}

export default function TransactionModal( {children, title}: ModalProps ) {
  return (
    <div className={`md:h-32 dark:bg-zinc-700 w-8/12 mx-auto ml-4 relative`}>
      <h3 className="text-center">Teste{title}</h3>
      <button className="text-red-500 absolute top-4 right-4"><AiOutlineClose /></button>
      {children}
    </div>
  )
}