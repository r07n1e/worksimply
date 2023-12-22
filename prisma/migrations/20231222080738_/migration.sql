/*
  Warnings:

  - The values [USER,ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Changed the column `role` on the `users` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- CreateEnum
CREATE TYPE "Profile_Prefix" AS ENUM ('Mr', 'Mrs', 'Miss');

-- CreateEnum
CREATE TYPE "Leave_Type" AS ENUM ('Annual_Leave', 'Sick_Leave', 'Sepcial_Leave', 'Replacement_Leave');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('User', 'Super_User', 'Manager', 'Project_Manager', 'Team_Lead');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new"[] USING ("role"::text::"Role_new"[]);
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT ARRAY['User']::"Role"[];
COMMIT;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "delflg" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "emergency_contact" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone_number" INTEGER,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "prefix" "Profile_Prefix",
ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "delflg" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "joinAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT ARRAY['User']::"Role"[],
ALTER COLUMN "role" SET DATA TYPE "Role"[];

-- CreateTable
CREATE TABLE "attendances" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "timeIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeOut" TIMESTAMP(3),
    "time_spent" DOUBLE PRECISION DEFAULT 0.00,
    "delflg" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeoffs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "Leave_Type" NOT NULL,
    "timeoff_start" DATE NOT NULL,
    "timeoff_end" DATE NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "remark" TEXT,
    "delflg" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "timeoffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "teamOwnerId" INTEGER NOT NULL,
    "delflg" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamMember" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamMember_AB_unique" ON "_TeamMember"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamMember_B_index" ON "_TeamMember"("B");

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeoffs" ADD CONSTRAINT "timeoffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_teamOwnerId_fkey" FOREIGN KEY ("teamOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMember" ADD CONSTRAINT "_TeamMember_A_fkey" FOREIGN KEY ("A") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMember" ADD CONSTRAINT "_TeamMember_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
