/*
  Warnings:

  - Added the required column `description` to the `timeoffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `timeoffs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Prefix" AS ENUM ('Mr', 'Mrs', 'Miss');

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "department" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "prefix" "Prefix",
ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "timeoffs" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "remark" TEXT,
ALTER COLUMN "timeoff_start" SET DATA TYPE DATE,
ALTER COLUMN "timeoff_end" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
