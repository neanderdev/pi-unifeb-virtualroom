/*
  Warnings:

  - Added the required column `name_matter_class` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class" ADD COLUMN     "name_matter_class" VARCHAR(150) NOT NULL;
