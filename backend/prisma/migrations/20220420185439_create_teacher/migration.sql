-- CreateTable
CREATE TABLE "teacher" (
    "uid_teacher" TEXT NOT NULL,
    "ra_teacher" REAL NOT NULL,
    "name_teacher" VARCHAR(150) NOT NULL,
    "gender_teacher" CHAR(1) NOT NULL,
    "cpf_cnpj_teacher" CHAR(14) NOT NULL,
    "tel_cel_teacher" CHAR(15) NOT NULL,
    "tel_res_teacher" CHAR(14) NOT NULL,
    "endereco_teacher" VARCHAR(80) NOT NULL,
    "numero_teacher" VARCHAR(10) NOT NULL,
    "bairro_teacher" VARCHAR(40) NOT NULL,
    "complemento_teacher" VARCHAR(50) NOT NULL,
    "cep_teacher" VARCHAR(9) NOT NULL,
    "cidade_teacher" VARCHAR(50) NOT NULL,
    "uf_teacher" CHAR(2) NOT NULL,
    "email_teacher" VARCHAR(100) NOT NULL,
    "dt_nascimento_teacher" DATE NOT NULL,
    "dt_matricula_teacher" DATE NOT NULL,
    "situacao_teacher" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("uid_teacher")
);

-- CreateIndex
CREATE UNIQUE INDEX "teacher_ra_teacher_key" ON "teacher"("ra_teacher");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_cpf_cnpj_teacher_key" ON "teacher"("cpf_cnpj_teacher");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_email_teacher_key" ON "teacher"("email_teacher");

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
