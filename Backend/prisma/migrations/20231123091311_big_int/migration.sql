/*
  Warnings:

  - You are about to alter the column `phone_number` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "phone_number" SET DATA TYPE INTEGER;
