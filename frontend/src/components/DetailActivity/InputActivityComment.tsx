import { Dispatch, SetStateAction } from "react";
import { Avatar, Box, Flex, Icon, Input, useToast } from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { useMutation } from "react-query";

import { setupAPIClient } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface InputActivityCommentProps {
    uid_user: string;
    uid_activity: string;
    avatarStudent: string;
    nameStudent: string;
    commentActivity: string;
    setCommentActivity: Dispatch<SetStateAction<string>>;
};

interface GetResponseActivityComment {
    id_private_comment: number;
    message: string;
    createdAt_private_comment: Date;
    user_uid: string;
    activity_uid: string;
};

interface CreateActivityComment {
    message: string;
    user_uid: string;
    activity_uid: string;
};

export function InputActivityComment({ uid_user, uid_activity, avatarStudent, nameStudent, commentActivity, setCommentActivity }: InputActivityCommentProps) {
    const toast = useToast();

    const createActivityComment = useMutation(async (activities: CreateActivityComment) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post<GetResponseActivityComment>('activity-comment', activities);

        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('listAllActivityComment')
        },
    });

    const handleCreateActivityComment = async () => {
        try {
            const createActivityCommentFormData = {
                message: commentActivity,
                user_uid: uid_user,
                activity_uid: uid_activity,
            };

            await createActivityComment.mutateAsync(createActivityCommentFormData);

            await toast({
                title: 'Comentário da atividade criado',
                description: "Comentário da atividade criado com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });

            setCommentActivity("");
        } catch (err) {
            console.log(err);

            toast({
                title: 'Erro ao criar comentário da atividade',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            my="6px"
            ml="12px"
            display="flex"
            alignItems="center"
        >
            <Avatar
                size="sm"
                src={avatarStudent}
                name={nameStudent}
                bg="pink.200"
            />

            <Flex
                as="label"
                flex="1"
                py="1"
                px="4"
                mx="6"
                w="full"
                alignSelf="center"
                color="gray.200"
                position="relative"
                bg="transparent"
                borderRadius="full"
                borderWidth="1px"
                borderColor="gray.100"
                _hover={{
                    borderColor: "gray.400",
                }}
            >
                <Input
                    color="gray.900"
                    variant="unstyled"
                    px="4"
                    mr="4"
                    placeholder="Adicionar comentário da atividade..."
                    _placeholder={{ color: 'gray.500' }}
                    value={commentActivity}
                    onChange={(e) => setCommentActivity(e.target.value)}
                />

                <Icon
                    as={BiSend}
                    fontSize="28"
                    color={commentActivity !== "" ? "gray.500" : "gray.200"}
                    cursor={commentActivity !== "" ? "pointer" : "not-allowed"}
                    title="Postar"
                    onClick={commentActivity !== "" ? handleCreateActivityComment : null}
                />
            </Flex>
        </Box>
    );
}