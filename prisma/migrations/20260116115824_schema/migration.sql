/*
  Warnings:

  - You are about to drop the column `CompletedAt` on the `TestSession` table. All the data in the column will be lost.
  - You are about to drop the column `ExpiresAt` on the `TestSession` table. All the data in the column will be lost.
  - You are about to drop the column `StartedAt` on the `TestSession` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `TestSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `TestSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiresAt` to the `TestSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionCode` to the `TestSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TestSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestSessionStatus" AS ENUM ('ONGOING', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "TestSession" DROP CONSTRAINT "TestSession_UserId_fkey";

-- AlterTable
ALTER TABLE "TestSession" DROP COLUMN "CompletedAt",
DROP COLUMN "ExpiresAt",
DROP COLUMN "StartedAt",
DROP COLUMN "UserId",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sessionCode" TEXT NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "TestSessionStatus" NOT NULL DEFAULT 'ONGOING',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TestSession_userId_key" ON "TestSession"("userId");

-- CreateIndex
CREATE INDEX "TestSession_sessionCode_status_idx" ON "TestSession"("sessionCode", "status");

-- AddForeignKey
ALTER TABLE "TestSession" ADD CONSTRAINT "TestSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
