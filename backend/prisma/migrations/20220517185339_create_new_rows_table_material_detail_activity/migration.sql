-- AlterTable
ALTER TABLE "material_activity" ALTER COLUMN "name_material_activity" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "material_detail_activity" ADD COLUMN     "name_material_detail_activity" VARCHAR(100) NOT NULL DEFAULT E'',
ADD COLUMN     "size_material_detail_activity" INTEGER NOT NULL DEFAULT 0;
