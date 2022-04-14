import { Avatar, Box, Text } from "@chakra-ui/react";

interface BoxBodyStudentProps {
    avatarStudent: string;
    nameStudent: string;
}

export function BoxBodyStudent({ avatarStudent, nameStudent }: BoxBodyStudentProps) {
    return (
        <Box display="flex" alignItems="center">
            <Avatar
                size="md"
                src={avatarStudent}
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