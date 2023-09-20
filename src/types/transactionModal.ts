import { modalSchema } from "@/schemas/transactionModalSchema";
import { z } from "zod";

export type modelTypeForm = z.infer<typeof modalSchema>;
