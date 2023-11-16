/*
  Warnings:

  - Made the column `rating_count` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "rating_count" SET NOT NULL,
ALTER COLUMN "rating_count" SET DEFAULT 0;
