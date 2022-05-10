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

interface GetClassUidResponse {
  classes: ClassResponse;
}

export async function getClassUid(
  uid_class: string,
  ctx?: GetServerSidePropsContext
): Promise<GetClassUidResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<ClassResponse>(`class/${uid_class}`);

  const classes = data;

  return {
    classes,
  };
}

export function useClassUid(
  uid_class: string,
  options?: UseQueryOptions
): UseQueryResult<GetClassUidResponse, unknown> {
  return useQuery(["classUid", uid_class], () => getClassUid(uid_class), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<GetClassUidResponse, unknown>;
}
