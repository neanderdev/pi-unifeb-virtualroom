/*
  Warnings:

  - A unique constraint covering the columns `[cpf_cnpj_user]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_cnpj_user_key" ON "user"("cpf_cnpj_user");
