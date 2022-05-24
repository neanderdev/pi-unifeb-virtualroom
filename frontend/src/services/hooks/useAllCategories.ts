import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface AllCategories {
  id_category_activity: number;
  name_category_activity: string;
  tipo_category_activity: string;
  class_uid: string;
}

type GetAllCategoriesResponse = AllCategories[];

export async function getAllCategories(
  class_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetAllCategoriesResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetAllCategoriesResponse>(
    `category-activity/${class_uid}`
  );

  return data;
}

export function useAllCategories(
  class_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetAllCategoriesResponse, unknown> {
  return useQuery(
    ["allCategories", class_uid],
    () => getAllCategories(class_uid),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    }
  ) as UseQueryResult<GetAllCategoriesResponse, unknown>;
}
