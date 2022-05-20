import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface Me {
  uid_user: string;
  cpf_cnpj_user: string;
  email_user: string;
  ra_user: number;
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
