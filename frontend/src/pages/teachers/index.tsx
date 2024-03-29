import NextLink from "next/link";
import { useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorModeValue, useMediaQuery, useToast } from "@chakra-ui/react";
import { RiAddLine, RiEditLine, RiEraserLine } from "react-icons/ri";
import { useMutation } from "react-query";

import { setupAPIClient } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { getMe } from "../../services/hooks/useMe";
import { useUsers } from "../../services/hooks/useUsers";

import { withSSRAuth } from "../../utils/withSSRAuth";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Pagination } from "../../components/Pagination";

interface TeachersProps {
    uid_user: string;
};

export default function Teachers({ uid_user }: TeachersProps) {
    const toast = useToast();
    const [page, setPage] = useState(1);
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const deleteUser = useMutation(async (uid_user: string) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.delete(`user/${uid_user}`);

        return response.data.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        },
    });

    const { data, isLoading, isFetching, error } = useUsers(page, 'T');

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['userUid', userId], async () => {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`user/${userId}`);

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10, // 10 minutes
        });
    }

    async function handleDeleteTeacher(uid_user: string) {
        try {
            await deleteUser.mutateAsync(uid_user);

            await toast({
                title: 'Professor excluído',
                description: "Professor excluído com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            })
        } catch (err) {
            toast({
                title: 'Erro ao excluir professor',
                description: `Erro: ${err.response?.data?.message ?? err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            })
        }
    }

    return (
        <Box>
            <Navbar title="Professores" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar uid_user={uid_user} />

                    {isSmallScreen && <MobileSidebar uid_user={uid_user} />}

                    <Box w="full">
                        <Box flex='1' borderRadius={8} bg={useColorModeValue('gray.200', 'gray.800')} p='8'>
                            <Flex mb='8' justify='space-between' align='center'>
                                <Heading size='lg' fontWeight='normal'>
                                    Professores

                                    {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
                                </Heading>

                                <NextLink href='/teachers/create' passHref>
                                    <Button
                                        as='a'
                                        size='sm'
                                        fontSize='sm'
                                        colorScheme='pink'
                                        leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                                    >
                                        Criar novo
                                    </Button>
                                </NextLink>
                            </Flex>

                            {isLoading ? (
                                <Flex justify='center'>
                                    <Spinner />
                                </Flex>
                            ) : error ? (
                                <Flex justify='center'>
                                    <Text>Falha ao obter dados do usuários.</Text>
                                </Flex>
                            ) : (
                                data.users.length > 0 ? (
                                    <>
                                        <Table colorScheme='linkedin'>
                                            <Thead>
                                                <Tr>
                                                    <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                                        <Checkbox colorScheme='pink' borderColor="gray" />
                                                    </Th>

                                                    <Th>Professor</Th>

                                                    {isWideVersion && <Th>CPF/CNPJ</Th>}

                                                    <Th>RA</Th>

                                                    {isWideVersion && <Th>Data de cadastro</Th>}

                                                    {isWideVersion && <Th width='8'></Th>}

                                                    {isWideVersion && <Th width='8'></Th>}
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {data.users.map((teacher) => {
                                                    return (
                                                        <Tr key={teacher.uid_user}>
                                                            <Td px={['4', '4', '6']}>
                                                                <Checkbox colorScheme='pink' borderColor="gray" />
                                                            </Td>

                                                            <Td>
                                                                <Box>
                                                                    <Link
                                                                        color='purple.400'
                                                                        href={`/teachers/${teacher.uid_user}`}
                                                                        onMouseEnter={() => handlePrefetchUser(teacher.uid_user)}
                                                                    >
                                                                        <Text fontWeight='bold'>{teacher.name_user}</Text>
                                                                    </Link>

                                                                    <Text fontSize='sm' color='gray.400'>{teacher.email_user}</Text>
                                                                </Box>
                                                            </Td>

                                                            {isWideVersion && <Td>{teacher.cpf_cnpj_user}</Td>}

                                                            <Td>{teacher.ra_user}</Td>

                                                            {isWideVersion && <Td>{teacher.dt_matricula_user}</Td>}

                                                            {isWideVersion && (
                                                                <>
                                                                    <Td>
                                                                        <Button
                                                                            as='a'
                                                                            size='sm'
                                                                            fontSize='sm'
                                                                            colorScheme='purple'
                                                                            leftIcon={<Icon as={RiEditLine} fontSize='16' />}
                                                                            href={`/teachers/${teacher.uid_user}`}
                                                                        >
                                                                            Editar
                                                                        </Button>
                                                                    </Td>

                                                                    <Td>
                                                                        <Button
                                                                            as='a'
                                                                            size='sm'
                                                                            fontSize='sm'
                                                                            colorScheme='red'
                                                                            leftIcon={<Icon as={RiEraserLine} fontSize='16' />}
                                                                            onClick={() => handleDeleteTeacher(teacher.uid_user)}
                                                                        >
                                                                            Excluir
                                                                        </Button>
                                                                    </Td>
                                                                </>
                                                            )}
                                                        </Tr>
                                                    );
                                                })}
                                            </Tbody>
                                        </Table>

                                        <Pagination
                                            totalCountOfRegisters={data.totalCount}
                                            totalCountOfRegistersNow={data.users.length}
                                            currentPage={page}
                                            onPageChange={setPage}
                                        />
                                    </>
                                ) : (
                                    <Text>Nenhum professor cadastrado 😪</Text>
                                )
                            )}
                        </Box>
                    </Box>
                </Stack>
            </Box >
        </Box >
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const { me } = await getMe(ctx);

    return {
        props: {
            uid_user: me.uid_user,
        }
    };
}, {
    roles: ['admin']
})