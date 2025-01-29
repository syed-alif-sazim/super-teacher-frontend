import { z } from "zod";

export const AddStudentFormSchema = z
  .object({
    students: z.array(z.string()).min(1, "Add at least one student"),
  })