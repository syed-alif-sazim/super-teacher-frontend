import {
  ERoles,
  EGender,
  EDegree,
  EEducationLevel,
  EMedium,
  ECollegeClass,
  ESchoolClass,
} from "@/shared/typedefs";

interface IStudent {
  address: string;
  phoneNumber: string;
  educationLevel: EEducationLevel;
}

interface ISchoolStudent extends IStudent {
  medium: EMedium;
  grade: ESchoolClass | ECollegeClass;
}

interface IUniversityStudent extends IStudent {
  degree?: EDegree;
  degreeName?: string;
  semesterYear?: string;
}
export interface IUser {
  firstName: string;
  lastName: string;
  gender: EGender;
  email: string;
  password: string;
  role: ERoles;
  studentForm?: ISchoolStudent | IUniversityStudent;
}
