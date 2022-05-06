import { Flex } from "@chakra-ui/react";

import { BoxTeacher } from "./BoxTeacher";
import { BoxStudent } from "./BoxStudent";

interface User {
    user: {
        ra_user: number;
        name_user: string;
        email_user: string;
        tipo_user: string;
    }
}

interface ClassmatesProps {
    teachers: User[];
    students: User[];
}

export function Classmates({ teachers, students }: ClassmatesProps) {
    return (
        <Flex
            p={5}
            direction="column"
        >
            <BoxTeacher teachers={teachers} />

            <BoxStudent students={students} />
        </Flex>
    );
}