import { prisma } from "../../../../database/prismaClient";

interface ICreateStudent {
  ra_student: number;
  name_student: string;
  gender_student: string;
  cpf_student: string;
  tel_cel_student: string;
  tel_res_student: string;
  endereco_student: string;
  numero_student: string;
  bairro_student: string;
  complemento_student: string;
  cep_student: string;
  cidade_student: string;
  uf_student: string;
  email_student: string;
  dt_nascimento_student: Date;
  dt_matricula_student: Date;
  situacao_student: boolean;
  user_id: number;
}

export class CreateStudentUseCase {
  async execute({
    ra_student,
    name_student,
    gender_student,
    cpf_student,
    tel_cel_student,
    tel_res_student,
    endereco_student,
    numero_student,
    bairro_student,
    complemento_student,
    cep_student,
    cidade_student,
    uf_student,
    email_student,
    dt_nascimento_student,
    dt_matricula_student,
    situacao_student,
    user_id,
  }: ICreateStudent) {
    // Validar se o RA do aluno existe
    const studentIsRaExists = await prisma.student.findUnique({
      where: {
        ra_student,
      },
    });

    if (studentIsRaExists) {
      throw new Error("RA already exists");
    }

    // Validar se o email do aluno existe
    const studentIsEmailExist = await prisma.student.findUnique({
      where: {
        email_student,
      },
    });

    if (studentIsEmailExist) {
      throw new Error("Email already exists");
    }

    // Validar se o CPF do aluno existe
    const studentIsCPFExists = await prisma.student.findUnique({
      where: {
        cpf_student,
      },
    });

    if (studentIsCPFExists) {
      throw new Error("CPF already exists");
    }

    // Salvar o aluno
    const student = await prisma.student.create({
      data: {
        ra_student,
        name_student,
        gender_student,
        cpf_student,
        tel_cel_student,
        tel_res_student,
        endereco_student,
        numero_student,
        bairro_student,
        complemento_student,
        cep_student,
        cidade_student,
        uf_student,
        email_student,
        dt_nascimento_student,
        dt_matricula_student,
        situacao_student,
        user_id,
      },
    });

    return student;
  }
}
