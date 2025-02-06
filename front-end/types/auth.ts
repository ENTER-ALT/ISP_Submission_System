export type LoginData = {
  username: string;
  password: string;
};

export type SessionData = {
  userId: number;
  email: string;
  userType: UserType;
  privileges?: number[];
};

export enum UserType {
  NONE = "None",
  ADMINISTRATIVE = "Administrative",
  STUDENT = "Student",
}

