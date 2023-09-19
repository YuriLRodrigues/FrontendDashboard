import { z } from "zod";

export const registerSchema = z
    .object({
      email: z.string().email("E-mail inválido"),
      name: z
        .string()
        .min(4, "Nome de usuário deve conter pelo menos 4 dígitos"),
      password: z
        .string()
        .min(8, "Senha deve conter pelo menos 8 dígitos")
        .regex(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
          "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um caractere especial."
        ),
      confirmPassword: z
        .string()
        .min(8, "Confirmação deve conter pelo menos 8 dígitos")
        .regex(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
          "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um caractere especial."
        ),
      accessName: z.string().optional(),
      cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    })
    .refine((fields) => fields.password === fields.confirmPassword, {
      path: ["confirmPassword"],
      message: "Senha e confirmação de senha não coincidem!",
    });