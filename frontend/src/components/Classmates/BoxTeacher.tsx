import { Box, Divider } from "@chakra-ui/react";

import { BoxBodyTeacher } from "./BoxBodyTeacher";
import { BoxHeaderTeacher } from "./BoxHeaderTeacher";

interface BoxTeacherProps {
    teachers: Array<{
        id: number;
        avatarTeacher: string;
        nameTeacher: string;
    }>;
}

export function BoxTeacher({ teachers }: BoxTeacherProps) {
    return (
        <Box>
            <BoxHeaderTeacher
                countTeacher={teachers.length}
            />

            <Divider orientation='horizontal' />

            {teachers.map(teacher => (
                <BoxBodyTeacher
                    key={teacher.id}
                    avatarTeacher={teacher.avatarTeacher}
                    nameTeacher={teacher.nameTeacher}
                />
            ))}
        </Box>
    );
}