import { Dispatch, SetStateAction } from "react";
import { Flex, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";

import { CardDetailActivity } from "./CardDetailActivity";
import { CardFinallizedActivity } from "./CardFinallizedActivity";
import { CardActivityComment } from "./CardActivityComment";

interface MaterialActivity {
    id_material_activity: number;
    name_material_activity: string;
    size_material_activity: number;
    link_material_activity: string;
    tipo_material_activity: string;
}

interface ActivityUid {
    uid_activity: string;
    name_activity: string;
    content_activity: string;
    dt_entrega_activity: Date;
    dt_entrega_activity_formated: string;
    isAcceptWithDelay_Activity: boolean;
    nota_max_activity: number;
    isEntregue_activity: boolean;
    createdAt_activity: Date | string;
    updatedAt_activity: Date | string;
    class_uid: string;
    category_activity_id: number;
    MaterialActivity: MaterialActivity[];
};

interface MaterialDetailActivity {
    id_material_detail_activity: number;
    link_material_detail_activity: string;
    detail_activity_id: number;
    name_material_detail_activity: string;
    size_material_detail_activity: number;
    format: string;
    size: number;
    name: string;
    blobURL: string;
};

interface User {
    name_user: string;
};

interface ActivityComment {
    id_private_comment: number;
    message: string;
    createdAt_private_comment: Date | string;
    user_uid: string;
    activity_uid: string;
    user: User;
};

interface DetailActivityProps {
    isLoading: boolean;
    error: boolean | unknown;
    data: ActivityUid;
    ra_user: number;
    uid_user: string;
    uid_activity: string;
    roles: any;
    dt_isEntrega_detail_acitivity: Date | string;
    nota_user: number;
    MaterialDetailActivity: MaterialDetailActivity[];
    avatarActivityComment: string;
    nameActivityComment: string;
    commentActivity: string;
    setCommentActivity: Dispatch<SetStateAction<string>>;
    activityComments: ActivityComment[];
    isLoadingActivityComments: boolean;
    isFetchingActivityComments: boolean;
    errorActivityComments: unknown;
};

export function DetailActivity({
    isLoading,
    error,
    data,
    ra_user,
    uid_user,
    uid_activity,
    roles,
    dt_isEntrega_detail_acitivity,
    nota_user,
    MaterialDetailActivity,
    avatarActivityComment,
    nameActivityComment,
    commentActivity,
    setCommentActivity,
    activityComments,
    isLoadingActivityComments,
    isFetchingActivityComments,
    errorActivityComments,
}: DetailActivityProps) {
    return (
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
            {isLoading ? (
                <Flex justify="center" alignItems="center">
                    <Spinner color="red" size="xl" />
                </Flex>
            ) : error ? (
                <Flex justify="center" alignItems="center">
                    <Text fontWeight="bold" fontSize="xl">Erro ao buscar esta atividade desta turma</Text>
                </Flex>
            ) : (
                <CardDetailActivity
                    name_activity={data.name_activity}
                    content_activity={data.content_activity}
                    dt_entrega_activity_formated={data.dt_entrega_activity_formated}
                    isEntregue_activity={data.isEntregue_activity}
                    createdAt_activity={data.createdAt_activity}
                    updatedAt_activity={data.updatedAt_activity}
                    materiais={data.MaterialActivity.filter((element) => element.tipo_material_activity === "M")}
                    links={data.MaterialActivity.filter((element) => element.tipo_material_activity === "L")}
                />
            )}

            <Stack direction="column" spacing={4}>
                {!isLoading && !error && data.isEntregue_activity &&
                    <CardFinallizedActivity
                        ra_user={ra_user}
                        uid_user={uid_user}
                        roles={roles}
                        dt_entrega_activity={data.dt_entrega_activity}
                        isAcceptWithDelay_Activity={data.isAcceptWithDelay_Activity}
                        dt_isEntrega_detail_acitivity={dt_isEntrega_detail_acitivity}
                        nota_max_activity={data.nota_max_activity}
                        nota_user={nota_user}
                        MaterialDetailActivity={MaterialDetailActivity}
                    />}

                {isLoadingActivityComments ? (
                    <Flex justify="center" alignItems="center">
                        <Spinner color="red" size="md" />
                    </Flex>
                ) : isFetchingActivityComments ? (
                    <Flex justify="center" alignItems="center">
                        <Spinner color="red" size="md" />
                    </Flex>
                ) : errorActivityComments ? (
                    <Flex justify="center" alignItems="center">
                        <Text fontWeight="bold" fontSize="xl">Erro ao buscar os comentários desta turma</Text>
                    </Flex>
                ) : (
                    <CardActivityComment
                        activityComments={activityComments}
                        uid_user={uid_user}
                        uid_activity={uid_activity}
                        avatarActivityComment={avatarActivityComment}
                        nameActivityComment={nameActivityComment}
                        commentActivity={commentActivity}
                        setCommentActivity={setCommentActivity}
                    />
                )}
            </Stack>
        </SimpleGrid>
    );
}