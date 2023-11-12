/*
  Warnings:

  - The `canReview` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CanReview" AS ENUM ('Pending', 'Yes', 'Done');

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "canReview",
ADD COLUMN     "canReview" "CanReview" NOT NULL DEFAULT 'Pending';
