import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

type User = {
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
};

type GetUserResponse = {
  user: User;
};

export async function getUserUid(
  uid_user: string,
  ctx?: GetServerSidePropsContext
): Promise<GetUserResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<User>(`user/${uid_user}`);

  const user = data;

  return {
    user,
  };
}

export function useUserUid(
  uid_user: string,
  options?: UseQueryOptions
): UseQueryResult<GetUserResponse, unknown> {
  return useQuery(["userUid", uid_user], () => getUserUid(uid_user), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetUserResponse, unknown>;
}
