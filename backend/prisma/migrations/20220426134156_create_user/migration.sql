-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher', 'admin');

-- CreateTable
CREATE TABLE "user" (
    "uid_user" TEXT NOT NULL,
    "ra_user" REAL NOT NULL,
    "name_user" VARCHAR(150) NOT NULL,
    "gender_user" CHAR(1) NOT NULL,
    "cpf_cnpj_user" TEXT NOT NULL,
    "tel_cel_user" CHAR(15) NOT NULL,
    "tel_res_user" CHAR(14) NOT NULL,
    "endereco_user" VARCHAR(80) NOT NULL,
    "numero_user" VARCHAR(10) NOT NULL,
    "bairro_user" VARCHAR(40) NOT NULL,
    "complemento_user" VARCHAR(50) NOT NULL,
    "cep_user" VARCHAR(9) NOT NULL,
    "cidade_user" VARCHAR(50) NOT NULL,
    "uf_user" CHAR(2) NOT NULL,
    "email_user" VARCHAR(100) NOT NULL,
    "dt_nascimento_user" DATE NOT NULL,
    "dt_matricula_user" DATE NOT NULL,
    "situacao_user" BOOLEAN NOT NULL DEFAULT true,
    "senha" TEXT NOT NULL,
    "tipo_user" CHAR(1) NOT NULL DEFAULT E'S',
    "role" "Role" NOT NULL DEFAULT E'student',

    CONSTRAINT "user_pkey" PRIMARY KEY ("uid_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_ra_user_key" ON "user"("ra_user");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_user_key" ON "user"("email_user");
