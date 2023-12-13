-- CreateEnum
CREATE TYPE "Leave_Type" AS ENUM ('Annual_Leave', 'Sick_Leave', 'Sepcial_Leave', 'Replacement_Leave');

-- CreateTable
CREATE TABLE "attendances" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "timeIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeOut" TIMESTAMP(3),
    "time_spent" DOUBLE PRECISION DEFAULT 0.00,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeoffs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "Leave_Type" NOT NULL,
    "timeoff_start" TIMESTAMP(3) NOT NULL,
    "timeoff_end" TIMESTAMP(3) NOT NULL,
    "attachment" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "timeoffs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeoffs" ADD CONSTRAINT "timeoffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
