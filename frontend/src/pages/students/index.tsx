import NextLink from "next/link";
import { useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { RiAddLine, RiEditLine, RiEraserLine } from "react-icons/ri";

import { setupAPIClient } from "../../services/api";

import { withSSRAuth } from "../../utils/withSSRAuth";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Pagination } from "../../components/Pagination";

interface Student {
    uid_user: string;
    ra_user: number;
    name_user: string;
    gender_user: string;
    cpf_cnpj_user: string;
    tel_cel_user: string;
    tel_res_user: string;
    endereco_user: string;
    numero_user: string;
    bairro_user: string;
    complemento_user: string;
    cep_user: string;
    cidade_user: string;
    uf_user: string;
    email_user: string;
    dt_nascimento_user: Date;
    dt_matricula_user: Date;
    situacao_user: boolean;
    senha: string;
    tipo_user: string;
    roles: string;
};

interface StudentsProps {
    students: Array<Student>;
}

export default function Students({ students }: StudentsProps) {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const [page, setPage] = useState(1);

    return (
        <Box>
            <Navbar title="Alunos" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <Box flex='1' borderRadius={8} bg={useColorModeValue('gray.200', 'gray.800')} p='8'>
                            <Flex mb='8' justify='space-between' align='center'>
                                <Heading size='lg' fontWeight='normal'>
                                    Alunos
                                </Heading>

                                <NextLink href='/students/create' passHref>
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

                            {students.length > 0 ? (
                                <>
                                    <Table colorScheme='linkedin'>
                                        <Thead>
                                            <Tr>
                                                <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                                    <Checkbox colorScheme='pink' borderColor="gray" />
                                                </Th>

                                                <Th>Aluno</Th>

                                                {isWideVersion && <Th>CPF/CNPJ</Th>}

                                                <Th>RA</Th>

                                                {isWideVersion && <Th>Data de cadastro</Th>}

                                                {isWideVersion && <Th width='8'></Th>}

                                                {isWideVersion && <Th width='8'></Th>}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {students.map((student) => {
                                                return (
                                                    <Tr key={student.uid_user}>
                                                        <Td px={['4', '4', '6']}>
                                                            <Checkbox colorScheme='pink' borderColor="gray" />
                                                        </Td>

                                                        <Td>
                                                            <Box>
                                                                <Link
                                                                    color='purple.400'
                                                                >
                                                                    <Text fontWeight='bold'>{student.name_user}</Text>
                                                                </Link>

                                                                <Text fontSize='sm' color='gray.400'>{student.email_user}</Text>
                                                            </Box>
                                                        </Td>

                                                        {isWideVersion && <Td>{student.cpf_cnpj_user}</Td>}

                                                        <Td>{student.ra_user}</Td>

                                                        {isWideVersion && <Td>{new Date(student.dt_matricula_user)
                                                            .toLocaleDateString('pt-BR', {
                                                                day: '2-digit',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            })}</Td>}

                                                        {isWideVersion && (
                                                            <>
                                                                <Td>
                                                                    <Button
                                                                        as='a'
                                                                        size='sm'
                                                                        fontSize='sm'
                                                                        colorScheme='purple'
                                                                        leftIcon={<Icon as={RiEditLine} fontSize='16' />}
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
                                        totalCountOfRegisters={students.length}
                                        currentPage={page}
                                        onPageChange={setPage}
                                    />
                                </>
                            ) : (
                                <Text>Nenhum aluno cadastrado 😪</Text>
                            )}
                        </Box>
                    </Box>
                </Stack>
            </Box >
        </Box >
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/user?tipo_user=S');

    return {
        props: {
            students: response.data,
        }
    };
}, {
    roles: 'admin'
})