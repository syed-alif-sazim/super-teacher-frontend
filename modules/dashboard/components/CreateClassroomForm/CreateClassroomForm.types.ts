import { ESubjects } from "@/shared/typedefs";

export type TCreateClassroomForm= {
    title: string;
    days: string[];
    subject: ESubjects;
    classTime: string;
};
