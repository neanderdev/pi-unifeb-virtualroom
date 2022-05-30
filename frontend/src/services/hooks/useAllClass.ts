import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface ClassUser {
  user: {
    ra_user: number;
    name_user: string;
    email_user: string;
    tipo_user: string;
  };
}

interface ClassResponse {
  uid_class: string;
  name_class: string;
  name_matter_class: string;
  background_class: string;
  isArchive: boolean;
  createdAt_class: Date;
  updatedAt_class: Date;
  ClassUser: ClassUser[];
}

type GetAllClassResponse = ClassResponse[];

export async function getAllClass(
  tipo: string,
  ctx?: GetServerSidePropsContext
): Promise<GetAllClassResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetAllClassResponse>("class", {
    params: {
      tipo,
    },
  });

  return data;
}

export function useAllClass(
  tipo: string,
  options?: UseQueryOptions
): UseQueryResult<GetAllClassResponse, unknown> {
  return useQuery(["class", tipo], () => getAllClass(tipo), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<GetAllClassResponse, unknown>;
}
