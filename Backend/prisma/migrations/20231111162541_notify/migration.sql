/*
  Warnings:

  - You are about to drop the column `hasNotification` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "hasNotification",
ADD COLUMN     "notification" BOOLEAN NOT NULL DEFAULT false;
