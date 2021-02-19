/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[verifyToken]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.verifyToken_unique" ON "User"("verifyToken");
