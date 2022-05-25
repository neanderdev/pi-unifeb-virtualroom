import { Box, Divider, Flex, Spinner, Stack, Text } from "@chakra-ui/react";

import { useListActivityAndUsers } from "../../services/hooks/useListActivityAndUsers";

import { StudentGradesHeader } from "./StudentGradesHeader";
import { StudentGradesDetail } from "./StudentGradesDetail";

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
                                activity_uid={activity.uid_activity}
                                id_detail_activity={activity.DetailActivity.filter((detail) => detail.user_uid === user.user.uid_user)[0]?.id_detail_activity}
                                uid_user={user.user.uid_user}
                                name_user={user.user.name_user}
                                nota_user={activity.DetailActivity.filter((detail) => detail.user_uid === user.user.uid_user)[0]?.nota_user}
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