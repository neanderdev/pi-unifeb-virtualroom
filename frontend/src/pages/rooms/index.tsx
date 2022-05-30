import { useState } from "react";
import { Box, Button, Flex, Icon, SimpleGrid, Spinner, Stack, Text, useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

import { getMe } from "../../services/hooks/useMe";
import { useAllClass } from "../../services/hooks/useAllClass";
import { useUsers } from "../../services/hooks/useUsers";

import { withSSRAuth } from "../../utils/withSSRAuth";

import { useModal } from "../../contexts/ModalContext";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { ClassCard } from "../../components/ClassCard";
import { Can } from "../../components/Can";
import { ModalAddUser } from "../../components/ModalAddUser";

interface Me {
    uid_user: string;
    cpf_cnpj_user: string;
    email_user: string;
    ra_user: number;
    roles: string;
};

interface RoomsProps {
    me: Me;
};

export default function Rooms({ me }: RoomsProps) {
    const { isOpen } = useModal();

    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const [page, setPage] = useState(1);
    const [classUidSelectedIsModal, setClassUidSelectedIsModal] = useState("");

    const { data, isLoading, error } = useAllClass("C");
    const {
        data: dataUsers,
        isLoading: isLoadingUsers,
        isFetching: isFetchingUsers,
        error: errorUsers
    } = useUsers(page, "A");

    return (
        <Box>
            <Navbar title="Salas de Aulas" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar uid_user={me.uid_user} />

                    {isSmallScreen && <MobileSidebar uid_user={me.uid_user} />}

                    <Box w="full">
                        <Can roles={["admin"]}>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='purple'
                                leftIcon={<Icon as={RiAddLine} fontSize='24' />}
                                mb="4"
                                href="/rooms/create"
                            >
                                Criar turma
                            </Button>
                        </Can>

                        <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignItems='flex-start'>
                            {isLoading ? (
                                <Flex justify='center' align="center">
                                    <Spinner size="xl" color='gray.500' ml='4' />
                                </Flex>
                            ) : error ? (
                                <Flex justify='center'>
                                    <Text>Falha ao obter dados da turmas.</Text>
                                </Flex>
                            ) : (
                                data.length === 0 ? (
                                    <Flex justify='center'>
                                        <Text>Você ainda não está em nenhuma turma.</Text>
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
                                        setClassUidSelectedIsModal={setClassUidSelectedIsModal}
                                    />
                                ))
                            )}
                        </SimpleGrid>
                    </Box>
                </Stack>
            </Box>

            {isOpen && <ModalAddUser
                class_uid={classUidSelectedIsModal}
                isWideVersion={isWideVersion}
                isLoadingUsers={isLoadingUsers}
                isFetchingUsers={isFetchingUsers}
                errorUsers={errorUsers}
                users={dataUsers?.users?.map((user) => {
                    return {
                        ...user,
                        checked: false,
                    };
                })}
                totalCount={dataUsers?.totalCount}
                page={page}
                setPage={setPage}
            />}
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