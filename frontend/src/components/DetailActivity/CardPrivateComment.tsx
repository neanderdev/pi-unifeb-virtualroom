import { Dispatch, SetStateAction } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { CgUser } from "react-icons/cg";

import { PrivateComment } from "./PrivateComment";
import { InputPrivateComment } from "./InputPrivateComment";

interface CardPrivateCommentProps {
    avatarPrivateComment: string;
    namePrivateComment: string;
    commentPrivate: string;
    setCommentPrivate: Dispatch<SetStateAction<string>>;
}

interface FakePrivateCommentProps {
    id: number;
    avatarStudent: string;
    nameStudent: string;
    privateComment: string;
}

const fakePrivateComment: Array<FakePrivateCommentProps> = [
    {
        id: 1,
        avatarStudent: "",
        nameStudent: "Neander de Souza",
        privateComment: "Slv professor, dúvidas...",
    }
];

export function CardPrivateComment({ avatarPrivateComment, namePrivateComment, commentPrivate, setCommentPrivate }: CardPrivateCommentProps) {
    return (
        <Box
            w="full"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="base"
        >
            <Box
                display="flex"
                my="6px"
                ml="12px"
            >
                <Icon as={CgUser} fontSize={22} />

                <Text ml={2}>Comentários particulares</Text>
            </Box>

            {fakePrivateComment.map((privateComment) => (
                <PrivateComment
                    key={privateComment.id}
                    avatarStudent={privateComment.avatarStudent}
                    nameStudent={privateComment.nameStudent}
                    privateComment={privateComment.privateComment}
                />
            ))}

            <InputPrivateComment
                avatarStudent={avatarPrivateComment}
                nameStudent={namePrivateComment}
                commentPrivate={commentPrivate}
                setCommentPrivate={setCommentPrivate}
            />
        </Box>
    );
}