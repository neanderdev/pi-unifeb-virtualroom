-- CreateTable
CREATE TABLE "class_notice" (
    "id_class_notice" SERIAL NOT NULL,
    "message" VARCHAR(250) NOT NULL,
    "createdAt_class_notice" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uid" TEXT NOT NULL,
    "class_uid" TEXT NOT NULL,

    CONSTRAINT "class_notice_pkey" PRIMARY KEY ("id_class_notice")
);

-- CreateTable
CREATE TABLE "class_notice_answer" (
    "id_class_notice_answer" SERIAL NOT NULL,
    "message" VARCHAR(250) NOT NULL,
    "createdAt_class_notice_answer" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uid" TEXT NOT NULL,
    "class_notice_id" INTEGER NOT NULL,

    CONSTRAINT "class_notice_answer_pkey" PRIMARY KEY ("id_class_notice_answer")
);

-- AddForeignKey
ALTER TABLE "class_notice" ADD CONSTRAINT "class_notice_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "user"("uid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_notice" ADD CONSTRAINT "class_notice_class_uid_fkey" FOREIGN KEY ("class_uid") REFERENCES "class"("uid_class") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_notice_answer" ADD CONSTRAINT "class_notice_answer_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "user"("uid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_notice_answer" ADD CONSTRAINT "class_notice_answer_class_notice_id_fkey" FOREIGN KEY ("class_notice_id") REFERENCES "class_notice"("id_class_notice") ON DELETE RESTRICT ON UPDATE CASCADE;
