import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface User {
  uid_user: string;
  ra_user: number;
  name_user: string;
  gender_user: string;
  cpf_cnpj_user: string;
  tel_cel_user: string;
  tel_res_user: string;
  endereco_user: string;
  numero_user: string;
  bairro_user: string;
  complemento_user: string;
  cep_user: string;
  cidade_user: string;
  uf_user: string;
  email_user: string;
  dt_nascimento_user: Date | string;
  dt_matricula_user: Date | string;
  situacao_user: boolean;
  senha: string;
  tipo_user: string;
  roles: string;
  checked?: boolean;
}

interface GetUserResponse {
  users: User[];
  totalCount: number;
}

export async function getUsers(
  page: number,
  tipo_user: string,
  ctx?: GetServerSidePropsContext
): Promise<GetUserResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data, headers } = await apiClient.get<GetUserResponse>("user", {
    params: {
      page,
      tipo_user,
    },
  });

  const users = data.users.map((user) => {
    return {
      uid_user: user.uid_user,
      ra_user: user.ra_user,
      name_user: user.name_user,
      gender_user: user.gender_user,
      cpf_cnpj_user: user.cpf_cnpj_user,
      tel_cel_user: user.tel_cel_user,
      tel_res_user: user.tel_res_user,
      endereco_user: user.endereco_user,
      numero_user: user.numero_user,
      bairro_user: user.bairro_user,
      complemento_user: user.complemento_user,
      cep_user: user.cep_user,
      cidade_user: user.cidade_user,
      uf_user: user.uf_user,
      email_user: user.email_user,
      dt_nascimento_user: new Date(user.dt_nascimento_user).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
      dt_matricula_user: new Date(user.dt_matricula_user).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
      situacao_user: user.situacao_user,
      senha: user.senha,
      tipo_user: user.tipo_user,
      roles: user.roles,
      checked: false,
    };
  });

  return {
    users,
    totalCount: Number(data.totalCount),
  };
}

export function useUsers(
  page: number,
  tipo_user: string,
  options?: UseQueryOptions
): UseQueryResult<GetUserResponse, unknown> {
  return useQuery(["user", page, tipo_user], () => getUsers(page, tipo_user), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetUserResponse, unknown>;
}
