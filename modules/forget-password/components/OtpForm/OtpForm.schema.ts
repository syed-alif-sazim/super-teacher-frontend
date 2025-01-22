import { z } from "zod";

export const OtpFormSchema = z
  .object({
    code: z.string().min(1, "Otp is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Otp is required",
    }),
})