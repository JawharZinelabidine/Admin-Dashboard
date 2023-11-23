/*
  Warnings:

  - You are about to drop the column `isPremium` on the `Restaurant` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('PREMIUM', 'BASIC', 'NONE');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "isPremium",
ADD COLUMN     "accountType" "TYPE" NOT NULL DEFAULT 'NONE';
