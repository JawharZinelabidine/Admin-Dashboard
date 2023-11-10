/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status";
