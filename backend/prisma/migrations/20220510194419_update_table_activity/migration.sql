/*
  Warnings:

  - You are about to alter the column `nota_max_activity` on the `activity` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "activity" ALTER COLUMN "nota_max_activity" SET DATA TYPE INTEGER;
