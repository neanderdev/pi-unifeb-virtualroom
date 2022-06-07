import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";

import { BoxHeaderStudent } from "./BoxHeaderStudent";
import { BoxBodyStudent } from "./BoxBodyStudent";

interface User {
    user: {
        ra_user: number;
        name_user: string;
        email_user: string;
        tipo_user: string;
        avatar: string;
    }
}


interface BoxStudentProps {
    students: User[];
}

export function BoxStudent({ students }: BoxStudentProps) {
    return (
        <Box mt={4}>
            <BoxHeaderStudent
                countStudent={students.length}
            />

            <Divider orientation='horizontal' />

            <Stack spacing={4} mt={4}>
                {students.length === 0 ? (
                    <Flex justify="center" alignItems="center">
                        <Text>Nenhum estudante vinculado a esta turma</Text>
                    </Flex>
                ) : (
                    <>
                        {students.map((student) => (
                            <BoxBodyStudent
                                key={student.user.ra_user}
                                avatarStudent={student.user.avatar}
                                nameStudent={student.user.name_user}
                            />
                        ))}
                    </>
                )}
            </Stack>
        </Box>
    );
}