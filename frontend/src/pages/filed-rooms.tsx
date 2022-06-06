import { Box, Flex, SimpleGrid, Spinner, Stack, Text, useMediaQuery } from "@chakra-ui/react";

import { getMe } from "../services/hooks/useMe";
import { useAllClass } from "../services/hooks/useAllClass";

import { withSSRAuth } from "../utils/withSSRAuth";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MobileSidebar } from "../components/Sidebar/MobileSidebar";
import { ClassCard } from "../components/ClassCard";

interface Me {
    uid_user: string;
    cpf_cnpj_user: string;
    email_user: string;
    ra_user: number;
    roles: string;
};

interface FiledRoomsProps {
    me: Me;
};

export default function FiledRooms({ me }: FiledRoomsProps) {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const { data, isLoading, error } = useAllClass("A");

    return (
        <Box>
            <Navbar title="Turmas Arquivadas" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar uid_user={me.uid_user} />

                    {isSmallScreen && <MobileSidebar uid_user={me.uid_user} />}

                    <Box w="full">
                        <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignItems='flex-start'>
                            {isLoading ? (
                                <Flex justify='center' align="center">
                                    <Spinner size="xl" color='gray.500' ml='4' />
                                </Flex>
                            ) : error ? (
                                <Flex justify='center'>
                                    <Text>Falha ao obter as turmas arquivadas.</Text>
                                </Flex>
                            ) : (
                                data.length === 0 ? (
                                    <Flex justify='center'>
                                        <Text>Nenhuma turma está arquivada.</Text>
                                    </Flex>
                                ) : data.map((turma) => (
                                    <ClassCard
                                        key={turma.uid_class}
                                        classUid={turma.uid_class}
                                        imageClass={`http://localhost:8000/files${turma.background_class}`}
                                        nameClass={turma.name_matter_class}
                                        hrefClass={`/rooms/${turma.uid_class}`}
                                        nameTeacherClass={turma.ClassUser?.filter((user) => user.user.tipo_user === 'T')[0]?.user.name_user}
                                        nameStudent={turma.ClassUser?.filter((user) => user.user.ra_user === me.ra_user)[0]?.user.name_user}
                                        imageStudent=""
                                        isArchiveClass={true}
                                    />
                                ))
                            )}
                        </SimpleGrid>
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
            me,
        }
    };
})