import { prisma } from "../../../../database/prismaClient";

interface ICreateTeacher {
  ra_teacher: number;
  name_teacher: string;
  gender_teacher: string;
  cpf_cnpj_teacher: string;
  tel_cel_teacher: string;
  tel_res_teacher: string;
  endereco_teacher: string;
  numero_teacher: string;
  bairro_teacher: string;
  complemento_teacher: string;
  cep_teacher: string;
  cidade_teacher: string;
  uf_teacher: string;
  email_teacher: string;
  dt_nascimento_teacher: Date;
  dt_matricula_teacher: Date;
  situacao_teacher: boolean;
  user_id: number;
}

export class CreateTeacherUseCase {
  async execute({
    ra_teacher,
    name_teacher,
    gender_teacher,
    cpf_cnpj_teacher,
    tel_cel_teacher,
    tel_res_teacher,
    endereco_teacher,
    numero_teacher,
    bairro_teacher,
    complemento_teacher,
    cep_teacher,
    cidade_teacher,
    uf_teacher,
    email_teacher,
    dt_nascimento_teacher,
    dt_matricula_teacher,
    situacao_teacher,
    user_id,
  }: ICreateTeacher) {
    // Validar se o RA do professor existe
    const teacherIsRaExists = await prisma.teacher.findUnique({
      where: {
        ra_teacher,
      },
    });

    if (teacherIsRaExists) {
      throw new Error("RA already exists");
    }

    // Validar se o email do professor existe
    const teacherIsEmailExist = await prisma.teacher.findUnique({
      where: {
        email_teacher,
      },
    });

    if (teacherIsEmailExist) {
      throw new Error("Email already exists");
    }

    // Validar se o CPF do professor existe
    const teacherIsCPFOrCNPJExists = await prisma.teacher.findUnique({
      where: {
        cpf_cnpj_teacher,
      },
    });

    if (teacherIsCPFOrCNPJExists) {
      throw new Error("CPF/CNPJ already exists");
    }

    // Salvar o professor
    const teacher = await prisma.teacher.create({
      data: {
        ra_teacher,
        name_teacher,
        gender_teacher,
        cpf_cnpj_teacher,
        tel_cel_teacher,
        tel_res_teacher,
        endereco_teacher,
        numero_teacher,
        bairro_teacher,
        complemento_teacher,
        cep_teacher,
        cidade_teacher,
        uf_teacher,
        email_teacher,
        dt_nascimento_teacher,
        dt_matricula_teacher,
        situacao_teacher,
        user_id,
      },
    });

    return teacher;
  }
}
