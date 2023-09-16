import { loginSchema } from "@/schemas/loginSchema";
import { z } from "zod";

export type loginTypeForm = z.infer<typeof loginSchema>