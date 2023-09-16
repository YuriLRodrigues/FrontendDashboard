import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";

export type registerTypeForm = z.infer<typeof registerSchema>