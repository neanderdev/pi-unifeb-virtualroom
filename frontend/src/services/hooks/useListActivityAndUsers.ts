import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface ClassUser {
  user: {
    uid_user: string;
    name_user: string;
  };
}

interface DetailActivity {
  id_detail_activity: number;
  dt_isEntrega_detail_acitivity: Date;
  activity_uid: string;
  nota_user: number;
  user_uid: string;
}

interface ActivityAndUsers {
  uid_activity: string;
  name_activity: string;
  createdAt_activity: Date;
  dt_entrega_activity: Date;
  nota_max_activity: number;
  class: {
    ClassUser: ClassUser[];
  };
  DetailActivity: DetailActivity[];
}

type GetListActivityAndUsers = ActivityAndUsers[];

export async function getListActivityAndUsers(
  class_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetListActivityAndUsers> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetListActivityAndUsers>(
    `list-activity-and-users/${class_uid}`
  );

  return data;
}

export function useListActivityAndUsers(
  class_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetListActivityAndUsers, unknown> {
  return useQuery(
    ["listActivityAndUsers", class_uid],
    () => getListActivityAndUsers(class_uid),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    }
  ) as UseQueryResult<GetListActivityAndUsers, unknown>;
}
