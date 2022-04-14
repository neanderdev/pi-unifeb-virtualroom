import { Box, Text } from "@chakra-ui/react";

interface BoxHeaderTeacherProps {
    countTeacher: number;
}

export function BoxHeaderTeacher({ countTeacher }: BoxHeaderTeacherProps) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text
                textStyle="default"
                fontSize="3xl"
                fontWeight="bold"
            >
                Professores
            </Text>

            <Text
                textStyle="default"
                fontSize="md"
                fontWeight="normal"
                ml={4}
            >
                {countTeacher === 1 ? `${countTeacher} professor` : `${countTeacher} professores`}
            </Text>
        </Box>
    );
}