import { User as PrismaUser} from "@prisma/client";

export type PrismaAdministrative = Omit<PrismaUser, 'userType' | 'nationality'>
export type PrismaStudent = Omit<PrismaUser, 'userType'>