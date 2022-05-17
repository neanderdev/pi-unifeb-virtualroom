import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface CategoryActivity {
  tipo_category_activity: string;
}

interface ClassUser {
  user: {
    name_user: string;
    tipo_user: string;
  };
}

interface Class {
  ClassUser: ClassUser[];
}

interface Acitivities {
  uid_activity: string;
  name_activity: string;
  createdAt_activity: Date | string;
  category_activity: CategoryActivity;
  class: Class;
}

type GetListActivitiesResponse = Acitivities[];

export async function getListActivities(
  class_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetListActivitiesResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetListActivitiesResponse>(
    `activity/${class_uid}`
  );

  const activities = data?.map((activity) => {
    return {
      ...activity,
      createdAt_activity: new Date(
        activity.createdAt_activity
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return activities;
}

export function useListActivities(
  class_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetListActivitiesResponse, unknown> {
  return useQuery(
    ["listActivities", class_uid],
    () => getListActivities(class_uid),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    }
  ) as UseQueryResult<GetListActivitiesResponse, unknown>;
}
