import { useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    Text,
    Flex,
    Icon,
    Input,
    VStack,
    Popover,
    PopoverTrigger,
    IconButton,
    Portal,
    PopoverContent,
    LinkOverlay,
    useToast
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import { useMutation } from 'react-query';

import { setupAPIClient } from "../../services/api";
import { queryClient } from '../../services/queryClient';

import { Comment } from "./Comment";

interface User {
    name_user: string;
};

interface ClassNoticeAnswer {
    id_class_notice_answer: number;
    message: string;
    createdAt_class_notice_answer: Date | string;
    user_uid: string;
    class_notice_id: number;
    user: User;
};

interface CommentNoticeProps {
    user_uid: string;
    classNoticeId: number;
    message: string;
    avatarTeacher: string;
    nameTeacher: string;
    publicDateComment: Date | string;
    classNoticeAnswer: ClassNoticeAnswer[];
    avatarStudent: string;
    nameStudent: string;
};

interface CreateClassNoticeAnswerFormData {
    message: string;
    user_uid: string;
    class_notice_id: number;
};

interface GetResponseCreateClassNoticeAnswer {
    id_class_notice_answer: number;
    message: string;
    createdAt_class_notice_answer: Date;
    user_uid: string;
    class_notice_id: number;
};

export function CommentNotice({ user_uid, classNoticeId, message, avatarTeacher, nameTeacher, publicDateComment, classNoticeAnswer, avatarStudent, nameStudent }: CommentNoticeProps) {
    const toast = useToast();
    const [classComment, setClassComment] = useState("");

    const createClassNoticeAnswer = useMutation(async (createClassNoticeAnswer: CreateClassNoticeAnswerFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post<GetResponseCreateClassNoticeAnswer>('class-notice-answer', createClassNoticeAnswer);

        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('classNotice')
        },
    });

    const handleCreateClassNoticeAnswer = async () => {
        try {
            const createClassNoticeAnswerFormData = {
                message: classComment,
                user_uid: user_uid,
                class_notice_id: classNoticeId,
            };

            await createClassNoticeAnswer.mutateAsync(createClassNoticeAnswerFormData);

            toast({
                title: 'Comentário do aviso criado',
                description: "Comentário do aviso criado criada com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });

            setClassComment("");
        } catch (err) {
            console.log(err);

            toast({
                title: 'Erro ao criar comentário do aviso',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            w="full"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.100"
            overflow="hidden"
        >
            <Box
                display="flex"
                alignItems="center"
            >
                <Flex w="full" cursor="pointer">
                    <Box
                        w={12}
                        h={12}
                        rounded="full"
                        my="6px"
                        ml="12px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar
                            size="md"
                            src={avatarTeacher}
                            name={nameTeacher}
                            bg="gray"
                        />
                    </Box>

                    <VStack ml={8} alignItems="start">
                        <Text>{nameTeacher}</Text>
                        <Text>{publicDateComment}</Text>
                    </VStack>
                </Flex>

                <Box ml="auto" mr={4}>
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                aria-label="Opções"
                                rounded="full"
                                bg="transparent"
                                _hover={{
                                    bg: "transparent",
                                }}
                                _active={{
                                    bg: "transparent",
                                }}
                                icon={<Icon as={IoEllipsisVertical} />}
                            />
                        </PopoverTrigger>

                        <Portal>
                            <PopoverContent w={24}>
                                <Text size='lg' m={2} cursor="pointer">
                                    <LinkOverlay
                                        onClick={() => alert("Copiar link")}
                                    >
                                        Copiar link
                                    </LinkOverlay>
                                </Text>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Box>
            </Box>

            <Box>
                <Box
                    my="6px"
                    ml="12px"
                >
                    <Text>{message}</Text>

                </Box>

                <Divider orientation='horizontal' />

                {classNoticeAnswer.map((answerClassNotice) => (
                    <Comment
                        key={answerClassNotice.id_class_notice_answer}
                        avatarStudent=""
                        nameStudent={answerClassNotice.user.name_user}
                        commentStudent={answerClassNotice.message}
                    />
                ))}

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
                            placeholder="Adicionar comentário para turma..."
                            _placeholder={{ color: 'gray.500' }}
                            value={classComment}
                            onChange={(e) => setClassComment(e.target.value)}
                        />

                        <Icon
                            as={BiSend}
                            fontSize="28"
                            color={classComment !== "" ? "gray.500" : "gray.200"}
                            cursor={classComment !== "" ? "pointer" : "not-allowed"}
                            title="Postar"
                            onClick={classComment !== "" ? handleCreateClassNoticeAnswer : null}
                        />
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}