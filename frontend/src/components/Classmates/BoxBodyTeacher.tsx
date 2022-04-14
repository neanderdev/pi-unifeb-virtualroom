import { Avatar, Box, Stack, Text } from "@chakra-ui/react";

interface BoxBodyTeacherProps {
    avatarTeacher: string;
    nameTeacher: string;
}

export function BoxBodyTeacher({ avatarTeacher, nameTeacher }: BoxBodyTeacherProps) {
    return (
        <Stack spacing={4} mt={4}>
            <Box display="flex" alignItems="center">
                <Avatar
                    size="md"
                    src={avatarTeacher}
                    name={nameTeacher}
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
                    {nameTeacher}
                </Text>
            </Box>
        </Stack>
    );
}