import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import { BoxBodyTeacher } from "./BoxBodyTeacher";
import { BoxHeaderTeacher } from "./BoxHeaderTeacher";

interface User {
    user: {
        ra_user: number;
        name_user: string;
        email_user: string;
        tipo_user: string;
    }
}

interface BoxTeacherProps {
    teachers: User[];
}

export function BoxTeacher({ teachers }: BoxTeacherProps) {
    return (
        <Box>
            <BoxHeaderTeacher
                countTeacher={teachers.length}
            />

            <Divider orientation='horizontal' />

            {teachers.length === 0 ? (
                <Flex justify="center" alignItems="center">
                    <Text>Nenhum professor vinculado a esta turma</Text>
                </Flex>
            ) : (
                <>
                    {teachers.map(teacher => (
                        <BoxBodyTeacher
                            key={teacher.user.ra_user}
                            avatarTeacher=""
                            nameTeacher={teacher.user.name_user}
                        />
                    ))}
                </>
            )}
        </Box>
    );
}