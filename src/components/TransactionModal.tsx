"use client";
import { useModalOpen } from "@/context/ModalIsOpen";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useState } from "react";
import { errorNotification, successNotification } from "@/utils/notications";
import { ToastContainer } from "react-toastify";
import { modelTypeForm } from "@/types/transactionModal";
import { useModalTransaction } from "@/hooks/useModalTransaction";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

export default function TransactionModal() {
  const { modalIsOpen, setModalIsOpen } = useModalOpen();
  const { handleSubmit, isDirty, isSubmitting, register, reset } = useModalTransaction();
  const { data: session } = useSession();
  
  const modalRef: any = useRef();
  const closeBtnRef: any = useRef();
  const [transitionType, setTransitionType] = useState<string>("entrada");
  const [paymentType, setPaymentType] = useState<string>("credit");

  const closeBtnModal = () => {
    setTransitionType("entrada");
    setPaymentType("credit");
    setModalIsOpen(!modalIsOpen);
    isDirty && reset();
  };

  const closeModal = (e: any) => {
    if (e.target == modalRef.current) {
      setTransitionType("entrada");
      setPaymentType("credit");
      setModalIsOpen(!modalIsOpen);
      isDirty && reset();
    }
  };

  const handleTransaction = async (data: modelTypeForm) => {
    data.transation = transitionType;
    data.payment = paymentType;

    if (data.transation === "saída") {
      try {
        const res = await fetch(
          "https://backend-dashboard-gold.vercel.app/newexpense",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          reset();
          return successNotification("Nova saída adicionada");
        }
        return errorNotification(
          "Erro ao adicionar uma nova saída, possível saldo insuficiente"
        );
      } catch (error) {
        return errorNotification(
          "Erro ao adicionar uma nova saída, possível saldo insuficiente"
        );
      }
    }

    try {
      const res = await fetch(
        "https://backend-dashboard-gold.vercel.app/newdeposit",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        reset();
        return successNotification("Novo depósito feito");
      }
      return errorNotification("Erro ao fazer novo depósito");
    } catch (error) {
      return errorNotification("Erro ao fazer novo depósito");
    }
  };

  return (
    <section
      className={`${
        modalIsOpen ? "flex h-screen w-full" : "hidden"
      } dark:bg-zinc-700/20 overflow-hidden bg-zinc-700/40 justify-center items-center backdrop-blur-sm absolute z-[100] top-0 left-0 duration-500`}
      onClick={(e) => closeModal(e)}
      ref={modalRef}
    >
      <ToastContainer />
      <div className="dark:bg-zinc-700 bg-zinc-200 md:w-5/12 mx-auto my-0 p-2 py-8 rounded-xl relative w-11/12 flex flex-col justify-center">
        <h3 className="text-center font-semibold text-xl pb-6">
          Nova Transação
        </h3>
        <button
          type="button"
          ref={closeBtnRef}
          onClick={() => closeBtnModal()}
          className="text-red-500 absolute top-3 right-5 font-extrabold text-xl"
        >
          <AiOutlineClose />
        </button>

        <form
          onSubmit={handleSubmit(handleTransaction)}
          className="flex flex-col gap-2"
        >
          <input
            {...register("title")}
            type="text"
            autoComplete="off"
            placeholder="Título"
            className="my-2 pl-2 md:w-5/12 w-11/12 dark:placeholder:text-white dark:text-white rounded dark:bg-zinc-950 mx-auto"
          />

          <label className="md:w-5/12 w-11/12 mx-auto dark:text-white text-black">
            Tipo da transação
          </label>
          <select
            {...register("transation")}
            onChange={(e) => setTransitionType(e.target.value)}
            name="Tipo"
            className="mb-4 self-start pl-2 md:w-5/12 w-11/12 dark:placeholder:text-white dark:text-white rounded dark:bg-zinc-950 mx-auto"
          >
            <option value="entrada">Entrada</option>
            <option value="saída">Saída</option>
          </select>

          {transitionType === "saída" && (
            <>
              <label className="md:w-5/12 w-11/12 mx-auto dark:text-white text-black">
                Método de pagamento
              </label>
              <select
                {...register("payment")}
                name="Pagamento"
                onChange={(e) => setPaymentType(e.target.value)}
                className="self-start pl-2 md:w-5/12 w-11/12 dark:placeholder:text-white dark:text-white rounded dark:bg-zinc-950 mx-auto"
              >
                <option key={1} value="credit">
                  Crédito
                </option>
                <option key={2} value="debit">
                  Débito
                </option>
                <option key={3} value="pix">
                  Pix
                </option>
              </select>
              <input
                {...register("store")}
                type="text"
                autoComplete="off"
                placeholder="Nome da loja"
                className="my-4 pl-2 md:w-5/12 w-11/12 dark:placeholder:text-white dark:text-white rounded dark:bg-zinc-950 mx-auto"
              />
            </>
          )}

          <input
            {...register("value")}
            type="number"
            autoComplete="off"
            placeholder="Valor"
            className="pl-2 md:w-5/12 w-11/12 dark:placeholder:text-white dark:text-white rounded dark:bg-zinc-950 mx-auto"
          />

          <input
            type="date"
            {...register("date")}
            className="mt-4 pl-2 md:w-5/12 w-11/12 dark:bg-zinc-950 rounded dark:placeholder:text-white mx-auto"
          />

          <button
            type="submit"
            className="duration-300 dark:bg-zinc-100 dark:text-black bg-zinc-950 text-white  font-semibold mt-4 w-3/12 rounded mx-auto"
          >
            {isSubmitting ? "Enviando" : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
}
