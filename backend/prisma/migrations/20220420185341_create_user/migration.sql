-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher', 'admin');

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "ra" REAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo_user" CHAR(1) NOT NULL DEFAULT E'S',
    "role" "Role" NOT NULL DEFAULT E'student',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_ra_key" ON "user"("ra");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
