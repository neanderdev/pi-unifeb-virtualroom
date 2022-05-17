/*
  Warnings:

  - You are about to alter the column `size_material_activity` on the `material_activity` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "material_activity" ALTER COLUMN "size_material_activity" SET DEFAULT 0,
ALTER COLUMN "size_material_activity" SET DATA TYPE INTEGER;
