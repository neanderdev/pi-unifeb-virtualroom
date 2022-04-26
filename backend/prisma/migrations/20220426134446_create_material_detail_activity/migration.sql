-- CreateTable
CREATE TABLE "material_detail_activity" (
    "id_material_detail_activity" SERIAL NOT NULL,
    "link_material_detail_activity" VARCHAR(180) NOT NULL,
    "detail_activity_id" INTEGER NOT NULL,

    CONSTRAINT "material_detail_activity_pkey" PRIMARY KEY ("id_material_detail_activity")
);

-- AddForeignKey
ALTER TABLE "material_detail_activity" ADD CONSTRAINT "material_detail_activity_detail_activity_id_fkey" FOREIGN KEY ("detail_activity_id") REFERENCES "detail_activity"("id_detail_activity") ON DELETE RESTRICT ON UPDATE CASCADE;
