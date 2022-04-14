import { Dispatch, SetStateAction } from "react";
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
    LinkOverlay
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";

import { Comment } from "./Comment";

interface CommentNoticeProps {
    avatarTeacher: string;
    nameTeacher: string;
    publicDateComment: string;
    avatarStudent: string;
    nameStudent: string;
    classComment: string;
    setClassComment: Dispatch<SetStateAction<string>>;
}

interface FakeCommentProps {
    id: number;
    avatarStudent: string;
    nameStudent: string;
    commentStudent: string;
}

const fakeComment: Array<FakeCommentProps> = [
    {
        id: 1,
        avatarStudent: "https://github.com/neanderdev.png",
        nameStudent: "Neander de Souza",
        commentStudent: "Bom dia professor, tamo junto 🚀",
    },
    {
        id: 2,
        avatarStudent: "",
        nameStudent: "Vinicius Cardoso",
        commentStudent: "Bom dia napa, tamo junto 💕",
    }
];

export function CommentNotice({ avatarTeacher, nameTeacher, publicDateComment, avatarStudent, nameStudent, classComment, setClassComment }: CommentNoticeProps) {
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
                    <Text>Bom dia pessoal, sejam bem vindos ao nosso ambiente virtual!</Text>

                </Box>

                <Divider orientation='horizontal' />

                {fakeComment.map((comment) => (
                    <Comment
                        key={comment.id}
                        avatarStudent={comment.avatarStudent}
                        nameStudent={comment.nameStudent}
                        commentStudent={comment.commentStudent}
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
                            onClick={() => classComment !== "" && alert(classComment)}
                        />
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}