import { ESubjects } from "@/shared/typedefs";
import { z } from "zod";

export const CreateClassroomFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),  
    days: z.array(z.string()).min(1, "Days is required"),
    subject: z.enum(Object.values(ESubjects) as [string, ...string[]]),
    classTime: z.string().min(1, "Class time is required") 
  })