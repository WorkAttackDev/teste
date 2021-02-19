-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.cid_unique" ON "User"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
