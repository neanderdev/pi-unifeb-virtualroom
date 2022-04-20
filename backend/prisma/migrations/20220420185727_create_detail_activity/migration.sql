-- CreateTable
CREATE TABLE "detail_activity" (
    "id_detail_activity" SERIAL NOT NULL,
    "dt_isEntrega_detail_acitivity" DATE NOT NULL,
    "activity_uid" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "detail_activity_pkey" PRIMARY KEY ("id_detail_activity")
);

-- AddForeignKey
ALTER TABLE "detail_activity" ADD CONSTRAINT "detail_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_activity" ADD CONSTRAINT "detail_activity_activity_uid_fkey" FOREIGN KEY ("activity_uid") REFERENCES "activity"("uid_activity") ON DELETE RESTRICT ON UPDATE CASCADE;
