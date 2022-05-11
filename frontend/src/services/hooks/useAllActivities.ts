import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface Activity {
  uid_activity: string;
  name_activity: string;
  dt_entrega_activity: string;
  createdAt_activity: string;
  updatedAt_activity: string;
}

interface AllActivities {
  id_category_activity: number;
  name_category_activity: string;
  tipo_category_activity: string;
  class_uid: string;
  Activity: Activity[];
}

type GetAllActivitiesResponse = AllActivities[];

export async function getAllActivities(
  class_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetAllActivitiesResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetAllActivitiesResponse>(
    `list-all-activities/${class_uid}`
  );

  const activities = data?.map((activities) => {
    return {
      ...activities,
      Activity: activities.Activity?.map((activity) => {
        return {
          ...activity,
          dt_entrega_activity: new Date(
            activity.dt_entrega_activity
          ).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          createdAt_activity: new Date(
            activity.createdAt_activity
          ).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          updatedAt_activity: new Date(
            activity.updatedAt_activity
          ).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };
      }),
    };
  });

  return activities;
}

export function useAllActivities(
  class_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetAllActivitiesResponse, unknown> {
  return useQuery(
    ["allActivities", class_uid],
    () => getAllActivities(class_uid),
    {
      staleTime: 1000 * 60 * 1, // 1 minutes
      ...options,
    }
  ) as UseQueryResult<GetAllActivitiesResponse, unknown>;
}
