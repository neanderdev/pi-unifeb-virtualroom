import { Box, Divider, Flex, Stack } from "@chakra-ui/react";

import { StudentGradesHeader } from "./StudentGradesHeader";
import { StudentGradesDetail } from "./StudentGradesDetail";

interface User {
    id_user: number;
    name_user: string;
};

interface FakeApiStudentActivity {
    id_activity: number;
    name_activity: string;
    nota_max: number;
    data_entrega_activity: Date | string;
    user: User[];
};

const fakeApiStudentActivity: FakeApiStudentActivity[] = [
    {
        id_activity: 1,
        name_activity: "TDE 01",
        nota_max: 4,
        data_entrega_activity: new Date(),
        user: [
            {
                id_user: 1,
                name_user: "Neander de Souza Faria"
            },
            {
                id_user: 2,
                name_user: "Vinicius Cardoso"
            },
            {
                id_user: 3,
                name_user: "Dudu Buch"
            },
        ],
    },
    {
        id_activity: 2,
        name_activity: "TDE 02",
        nota_max: 1,
        data_entrega_activity: new Date(),
        user: [
            {
                id_user: 1,
                name_user: "Neander de Souza Faria"
            },
            {
                id_user: 2,
                name_user: "Vinicius Cardoso"
            },
            {
                id_user: 3,
                name_user: "Dudu Buch"
            },
        ],
    },
];

export function StudentGrades() {
    return (
        <Flex
            p={5}
            direction="column"
        >
            {fakeApiStudentActivity.map((activity) => (
                <Box key={activity.id_activity}>
                    <StudentGradesHeader
                        title={activity.name_activity}
                        count={1}
                    />

                    <Divider orientation='horizontal' />

                    <Stack spacing={4} mt={2} direction="column">
                        {activity.user.map((user) => (
                            <StudentGradesDetail
                                key={user.id_user}
                                id={user.id_user}
                                name={user.name_user}
                                notaMax={activity.nota_max}
                            />
                        ))}
                    </Stack>
                </Box>
            ))}
        </Flex>
    );
}