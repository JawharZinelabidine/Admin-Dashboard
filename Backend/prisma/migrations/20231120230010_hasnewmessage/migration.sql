-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasNewMessage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasNewReview" BOOLEAN NOT NULL DEFAULT false;
