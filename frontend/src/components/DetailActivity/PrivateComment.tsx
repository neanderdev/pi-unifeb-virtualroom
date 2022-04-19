import { memo } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

interface PrivateCommentProps {
    avatarStudent: string;
    nameStudent: string;
    privateComment: string;
}

function PrivateCommentComponent({ avatarStudent, nameStudent, privateComment }: PrivateCommentProps) {
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

            <Text ml={4}>{privateComment}</Text>
        </Box>
    );
}

export const PrivateComment = memo(PrivateCommentComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
})