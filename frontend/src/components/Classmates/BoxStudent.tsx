import { Box, Divider, Stack } from "@chakra-ui/react";

import { BoxHeaderStudent } from "./BoxHeaderStudent";
import { BoxBodyStudent } from "./BoxBodyStudent";

interface BoxStudentProps {
    students: Array<{
        id: number;
        avatarStudent: string;
        nameStudent: string;
    }>;
}

export function BoxStudent({ students }: BoxStudentProps) {
    return (
        <Box mt={4}>
            <BoxHeaderStudent
                countStudent={students.length}
            />

            <Divider orientation='horizontal' />

            <Stack spacing={4} mt={4}>
                {students.map((student) => (
                    <BoxBodyStudent
                        key={student.id}
                        avatarStudent={student.avatarStudent}
                        nameStudent={student.nameStudent}
                    />
                ))}
            </Stack>
        </Box>
    );
}