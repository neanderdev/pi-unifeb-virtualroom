import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { setupAPIClient } from "../api";

interface User {
  name_user: string;
  avatar: string;
}

interface ClassNoticeAnswer {
  id_class_notice_answer: number;
  message: string;
  createdAt_class_notice_answer: Date | string;
  user_uid: string;
  class_notice_id: number;
  user: User;
}

interface ClassNotice {
  id_class_notice: number;
  message: string;
  createdAt_class_notice: Date | string;
  user_uid: string;
  class_uid: string;
  ClassNoticeAnswer: ClassNoticeAnswer[];
  user: User;
}

type GetAllClassNoticeResponse = ClassNotice[];

export async function getAllClassNotice(
  class_uid: string,
  ctx?: GetServerSidePropsContext
): Promise<GetAllClassNoticeResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<GetAllClassNoticeResponse>(
    `list-all-class-notice/${class_uid}`
  );

  const classNotices = data?.map((classNotice) => {
    return {
      ...classNotice,
      createdAt_class_notice: new Date(
        classNotice.createdAt_class_notice
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      ClassNoticeAnswer: classNotice?.ClassNoticeAnswer?.map(
        (classNoticeAnswer) => {
          return {
            ...classNoticeAnswer,
            createdAt_class_notice_answer: new Date(
              classNoticeAnswer.createdAt_class_notice_answer
            ).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            }),
          };
        }
      ),
    };
  });

  return classNotices;
}

export function useAllClassNotice(
  class_uid: string,
  options?: UseQueryOptions
): UseQueryResult<GetAllClassNoticeResponse, unknown> {
  return useQuery(
    ["classNotice", class_uid],
    () => getAllClassNotice(class_uid),
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
      ...options,
    }
  ) as UseQueryResult<GetAllClassNoticeResponse, unknown>;
}
