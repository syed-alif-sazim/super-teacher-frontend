import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const addMaterialFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required!"),
  instruction: z.string().trim().min(1, "Instruction is required"),
  file : z.instanceof(File, { message: "File is required" }),
});
