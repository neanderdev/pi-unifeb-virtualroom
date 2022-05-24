/*
  Warnings:

  - You are about to drop the `private_comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "private_comment" DROP CONSTRAINT "private_comment_activity_uid_fkey";

-- DropForeignKey
ALTER TABLE "private_comment" DROP CONSTRAINT "private_comment_user_uid_fkey";

-- DropTable
DROP TABLE "private_comment";

-- CreateTable
CREATE TABLE "activity_comment" (
    "id_private_comment" SERIAL NOT NULL,
    "message" VARCHAR(250) NOT NULL,
    "createdAt_private_comment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uid" TEXT NOT NULL,
    "activity_uid" TEXT NOT NULL,

    CONSTRAINT "activity_comment_pkey" PRIMARY KEY ("id_private_comment")
);

-- AddForeignKey
ALTER TABLE "activity_comment" ADD CONSTRAINT "activity_comment_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "user"("uid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_comment" ADD CONSTRAINT "activity_comment_activity_uid_fkey" FOREIGN KEY ("activity_uid") REFERENCES "activity"("uid_activity") ON DELETE RESTRICT ON UPDATE CASCADE;
