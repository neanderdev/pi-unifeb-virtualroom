-- AlterTable
ALTER TABLE "material_activity" ADD COLUMN     "name_material_activity" VARCHAR(80) NOT NULL DEFAULT E'',
ADD COLUMN     "size_material_activity" BIGINT NOT NULL DEFAULT 0;
