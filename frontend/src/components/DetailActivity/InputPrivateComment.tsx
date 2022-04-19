import { Dispatch, SetStateAction } from "react";
import { Avatar, Box, Flex, Icon, Input } from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";

interface InputPrivateCommentProps {
    avatarStudent: string;
    nameStudent: string;
    commentPrivate: string;
    setCommentPrivate: Dispatch<SetStateAction<string>>;
}

export function InputPrivateComment({ avatarStudent, nameStudent, commentPrivate, setCommentPrivate }: InputPrivateCommentProps) {
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
                    placeholder="Adicionar comentário particular..."
                    _placeholder={{ color: 'gray.500' }}
                    value={commentPrivate}
                    onChange={(e) => setCommentPrivate(e.target.value)}
                />

                <Icon
                    as={BiSend}
                    fontSize="28"
                    color={commentPrivate !== "" ? "gray.500" : "gray.200"}
                    cursor={commentPrivate !== "" ? "pointer" : "not-allowed"}
                    title="Postar"
                    onClick={() => commentPrivate !== "" && alert(commentPrivate)}
                />
            </Flex>
        </Box>
    );
}