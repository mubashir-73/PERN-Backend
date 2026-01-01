/*
  Warnings:

  - You are about to drop the column `CompletedAt` on the `TestSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestSession" DROP COLUMN "CompletedAt",
ADD COLUMN     "ExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
