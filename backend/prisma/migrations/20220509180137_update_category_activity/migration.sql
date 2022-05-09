/*
  Warnings:

  - Added the required column `tipo_category_activity` to the `category_activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category_activity" ADD COLUMN     "tipo_category_activity" CHAR(1) NOT NULL;
