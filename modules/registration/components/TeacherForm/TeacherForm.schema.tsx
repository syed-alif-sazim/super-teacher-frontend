import { z } from "zod";
import {EHighestEducationLevel, EGender } from "@/shared/typedefs";

export const TeacherFormSchema = z
  .object({
    code: z.string().min(1, "Unique code is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Unique code is required",
    }),
    firstName: z.string().min(1, "First Name is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "First Name is required",
    }),
    lastName: z.string().min(1, "Last Name is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Last Name is required",
    }),    
    gender: z.enum([EGender.Male, EGender.Female]),
    majorSubject: z.string().min(1, "Major Subject is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Major Subject is required",
    }),
    highestEducationLevel: z.enum([EHighestEducationLevel.Bachelors, EHighestEducationLevel.Masters, EHighestEducationLevel.PhD]),
    subjects: z.array(z.string()).min(1, "Subjects to teach is required"),
    email: z.string().email("Invalid email address"),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
    confirmPassword: z.string().min(1, "Confirm Password is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Confirm Password is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });