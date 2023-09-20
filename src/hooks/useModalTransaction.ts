import { modalSchema } from "@/schemas/transactionModalSchema";
import { modelTypeForm } from "@/types/transactionModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useModalTransaction = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    setFocus,
  } = useForm<modelTypeForm>({
    mode: "all",
    resolver: zodResolver(modalSchema),
  });
  return {
    register,
    handleSubmit,
    errors, isSubmitting, isDirty,
    reset,
  }
}