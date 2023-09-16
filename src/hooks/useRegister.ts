import { registerSchema } from "@/schemas/registerSchema";
import { registerTypeForm } from "@/types/registerForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useRegister = () => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<registerTypeForm>({
    resolver: zodResolver(registerSchema),
    reValidateMode: "onChange",
    mode: "onTouched",
    defaultValues: {
      accessName: '',
      confirmPassword: '',
      cpf: '',
      email: '',
      name: '',
      password: ''
    }
  });

  return {
    register, errors, isSubmitting, handleSubmit, reset
  }
};
