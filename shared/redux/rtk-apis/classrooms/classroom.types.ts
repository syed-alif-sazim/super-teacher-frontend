export type TClassroom = {
    title: string;
    subject: string;
    classTime: Date;
    days: Array<string>;
};

export type TUser = {
    firstName: string;
    lastName: string;
    email: string;
};

export type TUnenrolledStudent = {
    id: number;
    user: TUser;
};

export type TEnrolledStudent = {
    id: number;
    user: TUser;
};

export type TTeacher ={
    user:TUser;
}
export type TClassroomTeacher = {
    teacher: TTeacher
};
