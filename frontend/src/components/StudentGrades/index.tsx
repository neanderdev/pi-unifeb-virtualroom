import { Box, Divider, Flex, Spinner, Stack, Text } from "@chakra-ui/react";

import { useListActivityAndUsers } from "../../services/hooks/useListActivityAndUsers";

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

interface StudentGradesProps {
    class_uid: string;
}

export function StudentGrades({ class_uid }: StudentGradesProps) {
    const { data, isLoading, error } = useListActivityAndUsers(class_uid);

    if (isLoading) {
        return (
            <Flex justify="center" alignItems="center">
                <Spinner color="red" size="xl" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex justify="center" alignItems="center">
                <Text
                    fontWeight="bold"
                    fontSize="xl"
                    isTruncated
                >
                    Erro ao buscar esta atividade com os dados dos alunos desta turma
                </Text>
            </Flex>
        );
    }

    return (
        <Flex
            p={5}
            direction="column"
        >
            {data.map((activity) => (
                <Box key={activity.uid_activity}>
                    <StudentGradesHeader
                        name_activity={activity.name_activity}
                        count={activity.DetailActivity.length}
                    />

                    <Divider orientation='horizontal' />

                    <Stack spacing={4} mt={2} direction="column">
                        {activity.class?.ClassUser?.map((user) => (
                            <StudentGradesDetail
                                key={user.user.uid_user}
                                uid_user={user.user.uid_user}
                                name_user={user.user.name_user}
                                nota_max_activity={activity.nota_max_activity}
                                isStudentDeliveredTheActivity={activity.DetailActivity.filter((detail) => detail.user_uid === user.user.uid_user).length > 0 ? true : false}
                            />
                        ))}
                    </Stack>
                </Box>
            ))}
        </Flex>
    );
}