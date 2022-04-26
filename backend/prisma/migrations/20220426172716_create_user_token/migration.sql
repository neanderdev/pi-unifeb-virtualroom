-- CreateTable
CREATE TABLE "user_token" (
    "uid_user_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uid" TEXT NOT NULL,

    CONSTRAINT "user_token_pkey" PRIMARY KEY ("uid_user_token")
);

-- AddForeignKey
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "user"("uid_user") ON DELETE RESTRICT ON UPDATE CASCADE;
