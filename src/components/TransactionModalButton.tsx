"use client";
import { useModalOpen } from "@/context/ModalIsOpen";
import { AiOutlinePlusCircle } from "react-icons/ai";

export function TransactionModalButton() {
  const { modalIsOpen, setModalIsOpen } = useModalOpen();
  return (
    <button
      onClick={() => setModalIsOpen(!modalIsOpen)}
      className="flex items-center gap-2 dark:border-2 rounded p-1 dark:bg-white dark:text-purple-600 bg-purple-600 text-white"
    >
      {" "}
      {<AiOutlinePlusCircle />} Nova transação
    </button>
  );
}
