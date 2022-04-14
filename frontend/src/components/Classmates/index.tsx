import { Flex } from "@chakra-ui/react";

import { BoxTeacher } from "./BoxTeacher";
import { BoxStudent } from "./BoxStudent";

interface Teacher {
    id: number;
    avatarTeacher: string;
    nameTeacher: string;
}

interface Student {
    id: number;
    avatarStudent: string;
    nameStudent: string;
}


const fakeTeachers: Array<Teacher> = [
    {
        id: 1,
        avatarTeacher: "",
        nameTeacher: "Wendel Martins"
    },
];

const fakeStudents: Array<Student> = [
    {
        id: 1,
        avatarStudent: "https://github.com/neanderdev.png",
        nameStudent: "Neander Souza"
    },
    {
        id: 2,
        avatarStudent: "",
        nameStudent: "Vinicius Cardoso"
    },
    {
        id: 3,
        avatarStudent: "",
        nameStudent: "Luis Eduardo Buch"
    },
    {
        id: 4,
        avatarStudent: "",
        nameStudent: "Jorge Stundis"
    },
    {
        id: 5,
        avatarStudent: "",
        nameStudent: "Eduardo Celestrino"
    },
];

export function Classmates() {
    return (
        <Flex
            p={5}
            direction="column"
        >
            <BoxTeacher teachers={fakeTeachers} />

            <BoxStudent students={fakeStudents} />
        </Flex>
    );
}