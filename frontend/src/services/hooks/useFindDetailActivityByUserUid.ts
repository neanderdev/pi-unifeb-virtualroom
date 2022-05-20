import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface MaterialDetailActivity {
  id_material_detail_activity: number;
  link_material_detail_activity: string;
  detail_activity_id: number;
  name_material_detail_activity: string;
  size_material_detail_activity: number;
}

interface FindDetailActivityByUserUid {
  id_detail_activity: number;
  dt_isEntrega_detail_acitivity: Date | string;
  nota_user: number;
  MaterialDetailActivity: MaterialDetailActivity[];
}

type GetResponseFindDetailActivityByUserUid =
  FindDetailActivityByUserUid | null;

export async function getFindDetailActivityByUserUid(
  activity_uid: string,
  user_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetResponseFindDetailActivityByUserUid> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetResponseFindDetailActivityByUserUid>(
    `detail-activity/${activity_uid}/${user_uid}`
  );

  if (data) {
    data.dt_isEntrega_detail_acitivity = new Date(
      data?.dt_isEntrega_detail_acitivity
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return data;
}

export function useFindDetailActivityByUserUid(
  activity_uid: string,
  user_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetResponseFindDetailActivityByUserUid, unknown> {
  return useQuery(
    ["findDetailActivityByUserUid", activity_uid, user_uid],
    () => getFindDetailActivityByUserUid(activity_uid, user_uid),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    }
  ) as UseQueryResult<GetResponseFindDetailActivityByUserUid, unknown>;
}
