/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('student', 'teacher', 'admin');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "roles" "Roles" NOT NULL DEFAULT E'student';

-- DropEnum
DROP TYPE "Role";
