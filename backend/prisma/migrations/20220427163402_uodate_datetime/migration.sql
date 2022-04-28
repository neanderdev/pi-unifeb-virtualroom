-- AlterTable
ALTER TABLE "activity" ALTER COLUMN "dt_entrega_activity" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "detail_activity" ALTER COLUMN "dt_isEntrega_detail_acitivity" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "dt_nascimento_user" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "dt_matricula_user" SET DATA TYPE TIMESTAMP(3);
