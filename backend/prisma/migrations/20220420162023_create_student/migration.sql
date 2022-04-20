-- CreateTable
CREATE TABLE "student" (
    "uid_student" TEXT NOT NULL,
    "ra_student" REAL NOT NULL,
    "name_student" VARCHAR(150) NOT NULL,
    "gender_student" CHAR(1) NOT NULL,
    "cpf_student" CHAR(14) NOT NULL,
    "tel_cel_student" CHAR(15) NOT NULL,
    "tel_res_student" CHAR(14) NOT NULL,
    "endereco_student" VARCHAR(80) NOT NULL,
    "numero_student" VARCHAR(10) NOT NULL,
    "bairro_student" VARCHAR(40) NOT NULL,
    "complemento_student" VARCHAR(50) NOT NULL,
    "cep_student" VARCHAR(9) NOT NULL,
    "cidade_student" VARCHAR(50) NOT NULL,
    "uf_student" CHAR(2) NOT NULL,
    "email_student" VARCHAR(100) NOT NULL,
    "dt_nascimento_student" DATE NOT NULL,
    "dt_matricula_student" DATE NOT NULL,
    "situacao_student" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("uid_student")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_ra_student_key" ON "student"("ra_student");

-- CreateIndex
CREATE UNIQUE INDEX "student_cpf_student_key" ON "student"("cpf_student");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_student_key" ON "student"("email_student");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
