-- CreateTable
CREATE TABLE "class" (
    "uid_class" TEXT NOT NULL,
    "name_class" VARCHAR(150) NOT NULL,
    "background_class" VARCHAR(180) NOT NULL,
    "createdAt_class" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_class" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("uid_class")
);
