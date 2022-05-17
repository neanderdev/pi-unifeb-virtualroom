import { Dispatch, SetStateAction } from "react";
import { Flex, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";

import { CardDetailActivity } from "./CardDetailActivity";
import { CardFinallizedActivity } from "./CardFinallizedActivity";
import { CardPrivateComment } from "./CardPrivateComment";

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

interface DetailActivityProps {
    isLoading: boolean;
    error: boolean | unknown;
    data: ActivityUid;
    avatarPrivateComment: string;
    namePrivateComment: string;
    commentPrivate: string;
    setCommentPrivate: Dispatch<SetStateAction<string>>;
}

export function DetailActivity({ isLoading, error, data, avatarPrivateComment, namePrivateComment, commentPrivate, setCommentPrivate }: DetailActivityProps) {
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
                    dt_entrega_activity={data.dt_entrega_activity}
                    isEntregue_activity={data.isEntregue_activity}
                    createdAt_activity={data.createdAt_activity}
                    updatedAt_activity={data.updatedAt_activity}
                    materiais={data.MaterialActivity.filter((element) => element.tipo_material_activity === "M")}
                    links={data.MaterialActivity.filter((element) => element.tipo_material_activity === "L")}
                />
            )}

            <Stack direction="column" spacing={4}>
                <CardFinallizedActivity />

                <CardPrivateComment
                    avatarPrivateComment={avatarPrivateComment}
                    namePrivateComment={namePrivateComment}
                    commentPrivate={commentPrivate}
                    setCommentPrivate={setCommentPrivate}
                />
            </Stack>
        </SimpleGrid>
    );
}