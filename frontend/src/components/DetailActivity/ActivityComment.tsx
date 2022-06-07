import { memo } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

interface ActivityCommentProps {
    avatarStudent: string;
    nameStudent: string;
    message: string;
}

function ActivityCommentComponent({ avatarStudent, nameStudent, message }: ActivityCommentProps) {
    return (
        <Box
            my="6px"
            ml="12px"
            display="flex"
            alignItems="center"
        >
            <Avatar
                size="sm"
                src={avatarStudent === "" ? "" : `http://localhost:8000/files${avatarStudent}`}
                name={nameStudent}
                bg="pink.200"
            />

            <Text ml={4}>{message}</Text>
        </Box>
    );
}

export const ActivityComment = memo(ActivityCommentComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
})