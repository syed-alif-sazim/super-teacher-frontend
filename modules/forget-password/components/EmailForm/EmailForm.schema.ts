import { z } from "zod";

export const EmailFormSchema = z
  .object({
    email: z.string().email("Invalid email address")
})