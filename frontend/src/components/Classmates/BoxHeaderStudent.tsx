import { Box, Text } from "@chakra-ui/react";

interface BoxHeaderStudentProps {
    countStudent: number;
}

export function BoxHeaderStudent({ countStudent }: BoxHeaderStudentProps) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text
                textStyle="default"
                fontSize="3xl"
                fontWeight="bold"
            >
                Colegas de turma
            </Text>

            <Text
                textStyle="default"
                fontSize="md"
                fontWeight="normal"
                ml={4}
                isTruncated
            >
                {countStudent === 1 ? `${countStudent} aluno` : `${countStudent} alunos`}
            </Text>
        </Box>
    );
}