import { z } from "zod";

export const modalSchema = z.object({
  title: z.string(),
  transation: z.string(),
  value: z.coerce.number(),
  store: z.string().optional(),
  payment: z.string().optional(),
  date: z.coerce.date()
});
