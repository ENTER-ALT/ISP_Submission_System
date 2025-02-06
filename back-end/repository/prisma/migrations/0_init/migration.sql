-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('STUDENT', 'ADMINISTRATIVE');

-- CreateEnum
CREATE TYPE "IspStatus" AS ENUM ('NOTSUBMITTED', 'SUBMITTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "userType" "UserTypes" NOT NULL,
    "nationality" VARCHAR(256) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Privilege" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR(256) NOT NULL,

    CONSTRAINT "Privilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdministrativePrivilege" (
    "adminId" INTEGER NOT NULL,
    "privilegeId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "phase" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "isElective" BOOLEAN NOT NULL,
    "lecturers" TEXT[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseRequiredPassedCourses" (
    "courseId" INTEGER NOT NULL,
    "requiredCourseId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "StudentPassedCourse" (
    "courseId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paymentReference" VARCHAR(256) NOT NULL,
    "deadline" TIMESTAMP(0) NOT NULL DEFAULT NOW() + interval '3 month',
    "ispId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Isp" (
    "id" SERIAL NOT NULL,
    "totalCredits" INTEGER NOT NULL DEFAULT 60,
    "startYear" INTEGER NOT NULL,
    "status" "IspStatus" NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Isp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseAddedISP" (
    "courseId" INTEGER NOT NULL,
    "ispId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdministrativePrivilege_adminId_privilegeId_key" ON "AdministrativePrivilege"("adminId", "privilegeId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_phase_key" ON "Course"("name", "phase");

-- CreateIndex
CREATE UNIQUE INDEX "CourseRequiredPassedCourses_courseId_requiredCourseId_key" ON "CourseRequiredPassedCourses"("courseId", "requiredCourseId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPassedCourse_courseId_studentId_key" ON "StudentPassedCourse"("courseId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_ispId_key" ON "Invoice"("ispId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseAddedISP_courseId_ispId_key" ON "CourseAddedISP"("courseId", "ispId");

-- AddForeignKey
ALTER TABLE "AdministrativePrivilege" ADD CONSTRAINT "AdministrativePrivilege_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdministrativePrivilege" ADD CONSTRAINT "AdministrativePrivilege_privilegeId_fkey" FOREIGN KEY ("privilegeId") REFERENCES "Privilege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRequiredPassedCourses" ADD CONSTRAINT "CourseRequiredPassedCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRequiredPassedCourses" ADD CONSTRAINT "CourseRequiredPassedCourses_requiredCourseId_fkey" FOREIGN KEY ("requiredCourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPassedCourse" ADD CONSTRAINT "StudentPassedCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPassedCourse" ADD CONSTRAINT "StudentPassedCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_ispId_fkey" FOREIGN KEY ("ispId") REFERENCES "Isp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Isp" ADD CONSTRAINT "Isp_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAddedISP" ADD CONSTRAINT "CourseAddedISP_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAddedISP" ADD CONSTRAINT "CourseAddedISP_ispId_fkey" FOREIGN KEY ("ispId") REFERENCES "Isp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

