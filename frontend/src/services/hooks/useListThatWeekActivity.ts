import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface ThatWeekActivity {
  uid_activity: string;
  name_activity: string;
}

type GetListThatWeekActivity = ThatWeekActivity[];

export async function getListThatWeekActivity(
  class_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetListThatWeekActivity> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetListThatWeekActivity>(
    `list-that-week-activity/${class_uid}`
  );

  return data;
}

export function useListThatWeekActivity(
  class_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetListThatWeekActivity, unknown> {
  return useQuery(
    ["listThatWeekActivity", class_uid],
    () => getListThatWeekActivity(class_uid),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    }
  ) as UseQueryResult<GetListThatWeekActivity, unknown>;
}
