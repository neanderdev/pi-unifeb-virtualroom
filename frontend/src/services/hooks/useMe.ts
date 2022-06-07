import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface Me {
  uid_user: string;
  cpf_cnpj_user: string;
  email_user: string;
  ra_user: number;
  name_user: string;
  dt_nascimento_user: Date | string;
  gender_user: string;
  tel_cel_user: string;
  tel_res_user: string;
  endereco_user: string;
  numero_user: string;
  bairro_user: string;
  complemento_user: string;
  cep_user: string;
  cidade_user: string;
  uf_user: string;
  avatar: string;
  roles: string;
}

interface GetMeResponse {
  me: Me;
}

export async function getMe(
  ctx?: GetServerSidePropsContext
): Promise<GetMeResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<Me>("me");

  const me = data;

  return {
    me,
  };
}

export function useMe(
  options?: UseQueryOptions
): UseQueryResult<GetMeResponse, unknown> {
  return useQuery(["me"], () => getMe(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetMeResponse, unknown>;
}
