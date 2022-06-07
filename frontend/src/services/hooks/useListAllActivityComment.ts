import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface User {
  name_user: string;
  avatar: string;
}

interface ActivityComment {
  id_private_comment: number;
  message: string;
  createdAt_private_comment: Date | string;
  user_uid: string;
  activity_uid: string;
  user: User;
}

type GetResponseListActivityComment = ActivityComment[];

export async function getListAllActivityComment(
  activity_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetResponseListActivityComment> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetResponseListActivityComment>(
    `activity-comment/${activity_uid}`
  );

  const activityComments = data?.map((comment) => {
    return {
      ...comment,
      createdAt_private_comment: new Date(
        comment.createdAt_private_comment
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };
  });

  return activityComments;
}

export function useListAllActivityComment(
  activity_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetResponseListActivityComment, unknown> {
  return useQuery(
    ["listAllActivityComment", activity_uid],
    () => getListAllActivityComment(activity_uid),
    {
      staleTime: 1000 * 60 * 1, // 1 minutes
      ...options,
    }
  ) as UseQueryResult<GetResponseListActivityComment, unknown>;
}
