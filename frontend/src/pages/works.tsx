import { Box, Stack, Flex, useMediaQuery, Text, Spinner } from "@chakra-ui/react";

import { getMe } from "../services/hooks/useMe";
import { useListAllUserActivities } from "../services/hooks/useListAllUserActivities";

import { withSSRAuth } from "../utils/withSSRAuth";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MobileSidebar } from "../components/Sidebar/MobileSidebar";
import { BoxBodyAcitivity } from "../components/Activity/BoxBodyAcitivity";

interface WorksProps {
    uid_user: string;
};

export default function Works({ uid_user }: WorksProps) {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const { data, isLoading, error } = useListAllUserActivities(uid_user);

    return (
        <Box>
            <Navbar title="Salas de Aulas" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar uid_user={uid_user} />

                    {isSmallScreen && <MobileSidebar uid_user={uid_user} />}

                    <Box w="full">
                        <Flex
                            p={5}
                            direction="column"
                        >
                            <Flex direction="row" pt="1.5rem">
                                <Flex
                                    ml={4}
                                    w="full"
                                    direction="column"
                                >
                                    {isLoading ? (
                                        <Flex justify='center' align="center">
                                            <Spinner size="xl" color='gray.500' ml='4' />
                                        </Flex>
                                    ) : error ? (
                                        <Flex justify='center'>
                                            <Text>Falha ao obter atividades do usuário.</Text>
                                        </Flex>
                                    ) : (
                                        data?.activities?.length === 0 ? (
                                            <Flex justify='center'>
                                                <Text>Você não tem nenhuma atividade.</Text>
                                            </Flex>
                                        ) : (
                                            data?.activities?.map((activity) => (
                                                <BoxBodyAcitivity
                                                    key={activity.uid_activity}
                                                    uid_activity={activity.uid_activity}
                                                    class_uid={activity.class.uid_class}
                                                    tipoActivity={activity.category_activity.tipo_category_activity}
                                                    name_activity={activity.name_activity}
                                                    dt_entrega_activity={activity.dt_entrega_activity_formatted}
                                                    createdAt_activity={activity.createdAt_activity_formatted}
                                                    updatedAt_activity={activity.updatedAt_activity_formatted}
                                                />
                                            ))
                                        )
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const { me } = await getMe(ctx);

    return {
        props: {
            uid_user: me.uid_user,
        }
    };
})