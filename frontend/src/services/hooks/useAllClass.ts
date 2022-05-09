import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

type ClassUser = {
  user: {
    ra_user: number;
    name_user: string;
    email_user: string;
    tipo_user: string;
  };
};

type ClassResponse = {
  uid_class: string;
  name_class: string;
  name_matter_class: string;
  background_class: string;
  isArchive: boolean;
  createdAt_class: Date;
  updatedAt_class: Date;
  ClassUser: ClassUser[];
};

type GetAllClassResponse = ClassResponse[];

export async function getAllClass(
  ctx?: GetServerSidePropsContext
): Promise<GetAllClassResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetAllClassResponse>("class");

  return data;
}

export function useAllClass(
  options?: UseQueryOptions
): UseQueryResult<GetAllClassResponse, unknown> {
  return useQuery(["class"], () => getAllClass(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<GetAllClassResponse, unknown>;
}
