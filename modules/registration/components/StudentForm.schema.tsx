import { z } from "zod";
import { EDegree, EEducationLevel, EGender, EMedium } from "@/shared/typedefs";

export const StudentFormSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    gender: z.enum([EGender.Male, EGender.Female]),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z
      .string()
      .regex(/^01\d{9}$/, "Phone Number must start with 01 and contain exactly 11 digits"),
    educationLevel: z.enum([
      EEducationLevel.School,
      EEducationLevel.College,
      EEducationLevel.University,
    ]),
    medium: z.enum([EMedium.Bangla, EMedium.English]).optional(),
    class: z.string().optional(),
    degree: z.enum([EDegree.Bachelors, EDegree.Masters]).optional(),
    degreeName: z.string().optional(),
    semesterYear: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    if (
      data.educationLevel === EEducationLevel.School ||
      data.educationLevel === EEducationLevel.College
    ) {
      if (!data.medium) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Medium is required",
          path: ["medium"],
        });
      }
      if (!data.class) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Class is required",
          path: ["class"],
        });
      }
    }

    if (data.educationLevel === EEducationLevel.University) {
      if (!data.degree) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree is required",
          path: ["degree"],
        });
      }
      if (!data.degreeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree Name is required",
          path: ["degreeName"],
        });
      }
      if (!data.semesterYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Semester/Year is required",
          path: ["semesterYear"],
        });
      }
    }
  });
