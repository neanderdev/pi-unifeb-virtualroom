import NextLink from "next/link";
import { useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { RiAddLine, RiEditLine, RiEraserLine } from "react-icons/ri";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Pagination } from "../../components/Pagination";

interface fakeStudentsProps {
    idStudent: number;
    nameStudent: string;
    emailStudent: string;
    avatarStudent?: string;
    cpfOrCnpjStudent: string;
    generoStudent: string;
    createdAt: string;
    updatedAt?: string;
};

const fakeStudents: Array<fakeStudentsProps> = [
    {
        idStudent: 1,
        nameStudent: 'Salvitierra Bombadão',
        emailStudent: 'salvitierra.bombadao@email.com',
        cpfOrCnpjStudent: '11.111.111/0001-11',
        generoStudent: 'Masculino',
        createdAt: '18/04/2022',
        updatedAt: '19/04/2022',
    },
    {
        idStudent: 2,
        nameStudent: 'Wendel Cortes',
        emailStudent: 'wendel.bombadao@email.com',
        cpfOrCnpjStudent: '22.222.222/0001-22',
        generoStudent: 'Feminino',
        createdAt: '19/04/2022',
    },
    {
        idStudent: 3,
        nameStudent: 'Fábio Teste',
        emailStudent: 'fabio.bombadao@email.com',
        cpfOrCnpjStudent: '33.333.333/0001-33',
        generoStudent: 'Masculino',
        createdAt: '19/04/2022',
    },
];

export default function Students() {
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

                                <NextLink href='/Students/create' passHref>
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

                            <Table colorScheme='linkedin'>
                                <Thead>
                                    <Tr>
                                        <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                            <Checkbox colorScheme='pink' borderColor="gray" />
                                        </Th>

                                        <Th>Aluno</Th>

                                        {isWideVersion && <Th>CPF/CNPJ</Th>}

                                        {isWideVersion && <Th>Data de cadastro</Th>}

                                        {isWideVersion && <Th width='8'></Th>}

                                        {isWideVersion && <Th width='8'></Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {fakeStudents.map((student) => {
                                        return (
                                            <Tr key={student.idStudent}>
                                                <Td px={['4', '4', '6']}>
                                                    <Checkbox colorScheme='pink' borderColor="gray" />
                                                </Td>

                                                <Td>
                                                    <Box>
                                                        <Link
                                                            color='purple.400'
                                                        >
                                                            <Text fontWeight='bold'>{student.nameStudent}</Text>
                                                        </Link>
                                                        <Text fontSize='sm' color='gray.400'>{student.emailStudent}</Text>
                                                    </Box>
                                                </Td>

                                                {isWideVersion && <Td>{student.cpfOrCnpjStudent}</Td>}

                                                {isWideVersion && <Td>{student.createdAt}</Td>}

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
                            </Table >

                            <Pagination
                                totalCountOfRegisters={fakeStudents.length}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </Box >
                    </Box>
                </Stack>
            </Box >
        </Box >
    );
}