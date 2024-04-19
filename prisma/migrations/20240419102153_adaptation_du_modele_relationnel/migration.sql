/*
  Warnings:

  - The values [Coach,Sporty] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('COACH', 'SPORTY', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Coach" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "proofUrl" TEXT NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sporty" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sporty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportHasCoach" (
    "sportId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    "coachingStartDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportHasCoach_pkey" PRIMARY KEY ("coachId","sportId")
);

-- CreateTable
CREATE TABLE "SportHasSporty" (
    "sportId" INTEGER NOT NULL,
    "sportyId" INTEGER NOT NULL,
    "practiseStartDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportHasSporty_pkey" PRIMARY KEY ("sportId","sportyId")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coachId" INTEGER NOT NULL,
    "dietId" INTEGER NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramHasSporty" (
    "sportyId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "ProgramHasSporty_pkey" PRIMARY KEY ("programId","sportyId")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "Exercice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramHasExercice" (
    "programId" INTEGER NOT NULL,
    "exerciceId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramHasExercice_pkey" PRIMARY KEY ("programId","exerciceId")
);

-- CreateTable
CREATE TABLE "Aliment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nutrimentValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Aliment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietHasAliment" (
    "dietId" INTEGER NOT NULL,
    "alimentId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "DietHasAliment_pkey" PRIMARY KEY ("dietId","alimentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_userId_key" ON "Coach"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Sporty_userId_key" ON "Sporty"("userId");

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sporty" ADD CONSTRAINT "Sporty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportHasCoach" ADD CONSTRAINT "SportHasCoach_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportHasCoach" ADD CONSTRAINT "SportHasCoach_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportHasSporty" ADD CONSTRAINT "SportHasSporty_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportHasSporty" ADD CONSTRAINT "SportHasSporty_sportyId_fkey" FOREIGN KEY ("sportyId") REFERENCES "Sporty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramHasSporty" ADD CONSTRAINT "ProgramHasSporty_sportyId_fkey" FOREIGN KEY ("sportyId") REFERENCES "Sporty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramHasSporty" ADD CONSTRAINT "ProgramHasSporty_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramHasExercice" ADD CONSTRAINT "ProgramHasExercice_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramHasExercice" ADD CONSTRAINT "ProgramHasExercice_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietHasAliment" ADD CONSTRAINT "DietHasAliment_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietHasAliment" ADD CONSTRAINT "DietHasAliment_alimentId_fkey" FOREIGN KEY ("alimentId") REFERENCES "Aliment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
