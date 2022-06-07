import { memo } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

interface BoxBodyStudentProps {
    avatarStudent: string;
    nameStudent: string;
}

function BoxBodyStudentComponent({ avatarStudent, nameStudent }: BoxBodyStudentProps) {
    return (
        <Box display="flex" alignItems="center">
            <Avatar
                size="md"
                src={avatarStudent === "" ? "" : `http://localhost:8000/files${avatarStudent}`}
                name={nameStudent}
                bg="gray"
                color="white"
            />

            <Text
                textStyle="default"
                fontSize="xl"
                fontWeight="medium"
                ml={4}
                isTruncated
            >
                {nameStudent}
            </Text>
        </Box>
    );
}

export const BoxBodyStudent = memo(BoxBodyStudentComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
})