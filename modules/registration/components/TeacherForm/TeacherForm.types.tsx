import {EGender, EHighestEducationLevel} from "@/shared/typedefs"

export type TTeacherForm= {
    code: string;
    firstName: string;
    lastName: string;
    gender: EGender;
    majorSubject : string;
    highestEducationLevel: EHighestEducationLevel;
    subjects: string[],
    email: string;
    password: string;
    confirmPassword: string;
};
