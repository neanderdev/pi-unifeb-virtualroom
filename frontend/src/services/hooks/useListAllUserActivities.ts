import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface Activity {
  uid_activity: string;
  name_activity: string;
  content_activity: string;
  dt_entrega_activity: Date;
  isAcceptWithDelay_Activity: boolean;
  nota_max_activity: number;
  isEntregue_activity: boolean;
  createdAt_activity: Date;
  updatedAt_activity: Date;
  class_uid: string;
  category_activity_id: number;
  dt_entrega_activity_formatted?: string;
  createdAt_activity_formatted?: string;
  updatedAt_activity_formatted?: string;
  category_activity: {
    tipo_category_activity: string;
  };
  class: {
    uid_class: string;
  };
}

interface GetListAllUserActivitiesResponse {
  result: Activity[];
  count: number;
}

interface ListAllUserActivities {
  activities: Activity[];
  count: number;
}

export async function getListAllUserActivities(
  user_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<ListAllUserActivities> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetListAllUserActivitiesResponse>(
    `list-all-user-activities/${user_uid}`
  );

  const activities = data?.result?.map((activity) => {
    return {
      ...activity,
      dt_entrega_activity_formatted: new Date(
        activity.dt_entrega_activity
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      createdAt_activity_formatted: new Date(
        activity.createdAt_activity
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      updatedAt_activity_formatted: new Date(
        activity.updatedAt_activity
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    activities: activities,
    count: data.count,
  };
}

export function useListAllUserActivities(
  user_uid: string,
  options?: UseQueryOptions
): UseQueryResult<ListAllUserActivities, unknown> {
  return useQuery(
    ["listAllUserActivities", user_uid],
    () => getListAllUserActivities(user_uid),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    }
  ) as UseQueryResult<ListAllUserActivities, unknown>;
}
