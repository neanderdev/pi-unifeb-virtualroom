-- CreateTable
CREATE TABLE "material_activity" (
    "id_material_activity" SERIAL NOT NULL,
    "link_material_activity" VARCHAR(180) NOT NULL,
    "tipo_material_activity" CHAR(1) NOT NULL DEFAULT E'M',
    "activity_uid" TEXT NOT NULL,

    CONSTRAINT "material_activity_pkey" PRIMARY KEY ("id_material_activity")
);

-- AddForeignKey
ALTER TABLE "material_activity" ADD CONSTRAINT "material_activity_activity_uid_fkey" FOREIGN KEY ("activity_uid") REFERENCES "activity"("uid_activity") ON DELETE RESTRICT ON UPDATE CASCADE;
