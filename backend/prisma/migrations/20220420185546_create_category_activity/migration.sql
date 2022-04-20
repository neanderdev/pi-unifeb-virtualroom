-- CreateTable
CREATE TABLE "category_activity" (
    "id_category_activity" SERIAL NOT NULL,
    "name_category_activity" VARCHAR(100) NOT NULL,
    "class_uid" TEXT NOT NULL,

    CONSTRAINT "category_activity_pkey" PRIMARY KEY ("id_category_activity")
);

-- AddForeignKey
ALTER TABLE "category_activity" ADD CONSTRAINT "category_activity_class_uid_fkey" FOREIGN KEY ("class_uid") REFERENCES "class"("uid_class") ON DELETE RESTRICT ON UPDATE CASCADE;
