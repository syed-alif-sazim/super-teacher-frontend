import {EGender, EDegree, EEducationLevel, EMedium, ECollegeClass, ESchoolClass } from "@/shared/typedefs"

export type TStudentForm= {
    firstName: string;
    lastName: string;
    gender: EGender;
    address: string;
    phoneNumber: string;
    educationLevel: EEducationLevel;
    medium?: EMedium;
    grade?: ESchoolClass | ECollegeClass;
    degree?: EDegree;
    degreeName?: string;
    semesterYear?: string;
    email: string;
    password: string;
    confirmPassword: string;
};
