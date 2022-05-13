-- AlterTable
ALTER TABLE "activity" ALTER COLUMN "isAcceptWithDelay_Activity" SET DEFAULT false;

-- AlterTable
ALTER TABLE "detail_activity" ADD COLUMN     "nota_user" DECIMAL(65,30) NOT NULL DEFAULT 0.00;
