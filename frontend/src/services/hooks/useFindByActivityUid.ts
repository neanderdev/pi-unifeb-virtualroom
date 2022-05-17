import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface MaterialActivity {
  id_material_activity: number;
  name_material_activity: string;
  size_material_activity: number;
  link_material_activity: string;
  tipo_material_activity: string;
}

interface FindByActivityUidResponse {
  uid_activity: string;
  name_activity: string;
  content_activity: string;
  dt_entrega_activity: Date | string;
  isAcceptWithDelay_Activity: boolean;
  nota_max_activity: number;
  isEntregue_activity: boolean;
  createdAt_activity: Date | string;
  updatedAt_activity: Date | string;
  class_uid: string;
  category_activity_id: number;
  MaterialActivity: MaterialActivity[];
}

export async function getFindByActivityUid(
  uid_activity: string,
  ctx?: GetServerSidePropsContext
): Promise<FindByActivityUidResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<FindByActivityUidResponse>(
    `find-by-activity-uid/${uid_activity}`
  );

  if (data) {
    data.dt_entrega_activity = new Date(
      data?.dt_entrega_activity
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    data.createdAt_activity = new Date(
      data?.createdAt_activity
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    data.updatedAt_activity = new Date(
      data?.updatedAt_activity
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return data;
}

export function useFindByActivityUid(
  uid_activity: string,
  options?: UseQueryOptions
): UseQueryResult<FindByActivityUidResponse, unknown> {
  return useQuery(
    ["findByActivityUid", uid_activity],
    () => getFindByActivityUid(uid_activity),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    }
  ) as UseQueryResult<FindByActivityUidResponse, unknown>;
}
