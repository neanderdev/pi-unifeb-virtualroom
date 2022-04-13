import { Avatar, Box, Text } from "@chakra-ui/react";

interface CommentProps {
    avatarStudent: string;
    nameStudent: string;
    commentStudent: string;
}

export function Comment({ avatarStudent, nameStudent, commentStudent }: CommentProps) {
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

            <Text ml={4}>{commentStudent}</Text>
        </Box>
    );
}