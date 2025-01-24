export type TLoginRequestFields = {
  email: string;
  password: string;
};

export enum EUserRole {
  TEACHER = "teacher",
  STUDENT = "student",
}

export type TTokenizedUser = {
  userId: number;  
  email: string; 
  role: string;
  roleId : number | null;
};

export type TLoginResponse = {
  accessToken: string;
  user: TTokenizedUser;
};
