-- CreateTable
CREATE TABLE "activity" (
    "uid_activity" TEXT NOT NULL,
    "name_activity" VARCHAR(100) NOT NULL,
    "content_activity" TEXT NOT NULL,
    "dt_entrega_activity" DATE NOT NULL,
    "isAcceptWithDelay_Activity" BOOLEAN NOT NULL DEFAULT true,
    "nota_max_activity" DECIMAL(2,2) NOT NULL,
    "isEntregue_activity" BOOLEAN NOT NULL DEFAULT false,
    "createdAt_activity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_activity" TIMESTAMP(3) NOT NULL,
    "class_uid" TEXT NOT NULL,
    "category_activity_id" INTEGER NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("uid_activity")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_class_uid_fkey" FOREIGN KEY ("class_uid") REFERENCES "class"("uid_class") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_category_activity_id_fkey" FOREIGN KEY ("category_activity_id") REFERENCES "category_activity"("id_category_activity") ON DELETE RESTRICT ON UPDATE CASCADE;
