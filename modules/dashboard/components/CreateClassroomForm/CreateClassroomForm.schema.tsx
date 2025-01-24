import { ESubjects } from "@/shared/typedefs";
import { z } from "zod";

export const CreateClassroomFormSchema = z
  .object({
    title: z.string().min(1, "Title is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Title is required",
    }),   
    days: z.array(z.string()).min(1, "Days is required"),
    subject: z.enum([ESubjects.Physics, ESubjects.Mathematics, ESubjects.Chemistry, ESubjects.Biology, ESubjects.English, ESubjects.Bangla, ESubjects.History, ESubjects.Geography]),
    classTime: z.string().min(1, "Class time is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Class time is required",
    }),  
  })