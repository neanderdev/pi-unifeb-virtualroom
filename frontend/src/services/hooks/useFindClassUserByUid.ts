import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface ClassUser {
  id_class_user: number;
  class_uid: string;
  user_uid: string;
}

type ClassUserResponse = ClassUser[];

export async function getFindClassUserByUid(
  class_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<ClassUserResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<ClassUserResponse>(
    `class-user/${class_uid}`
  );

  return data;
}

export function useFindClassUserByUid(
  class_uid: string,
  options?: UseQueryOptions
): UseQueryResult<ClassUserResponse, unknown> {
  return useQuery(
    ["classUser", class_uid],
    () => getFindClassUserByUid(class_uid),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    }
  ) as UseQueryResult<ClassUserResponse, unknown>;
}
