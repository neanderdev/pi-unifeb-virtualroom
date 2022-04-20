-- CreateTable
CREATE TABLE "class_user" (
    "id_class_user" SERIAL NOT NULL,
    "class_uid" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "class_user_pkey" PRIMARY KEY ("id_class_user")
);

-- AddForeignKey
ALTER TABLE "class_user" ADD CONSTRAINT "class_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_user" ADD CONSTRAINT "class_user_class_uid_fkey" FOREIGN KEY ("class_uid") REFERENCES "class"("uid_class") ON DELETE RESTRICT ON UPDATE CASCADE;
