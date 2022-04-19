import NextLink from "next/link";
import { useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { RiAddLine, RiEditLine, RiEraserLine } from "react-icons/ri";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Pagination } from "../../components/Pagination";

interface fakeTeachersProps {
    idTeacher: number;
    nameTeacher: string;
    emailTeacher: string;
    avatarTeacher?: string;
    cpfOrCnpjTeacher: string;
    generoTeacher: string;
    createdAt: string;
    updatedAt?: string;
};

const fakeTeachers: Array<fakeTeachersProps> = [
    {
        idTeacher: 1,
        nameTeacher: 'Salvitierra Bombadão',
        emailTeacher: 'salvitierra.bombadao@email.com',
        cpfOrCnpjTeacher: '11.111.111/0001-11',
        generoTeacher: 'Masculino',
        createdAt: '18/04/2022',
        updatedAt: '19/04/2022',
    },
    {
        idTeacher: 2,
        nameTeacher: 'Wendel Cortes',
        emailTeacher: 'wendel.bombadao@email.com',
        cpfOrCnpjTeacher: '22.222.222/0001-22',
        generoTeacher: 'Feminino',
        createdAt: '19/04/2022',
    },
    {
        idTeacher: 3,
        nameTeacher: 'Fábio Teste',
        emailTeacher: 'fabio.bombadao@email.com',
        cpfOrCnpjTeacher: '33.333.333/0001-33',
        generoTeacher: 'Masculino',
        createdAt: '19/04/2022',
    },
];

export default function Teachers() {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const [page, setPage] = useState(1);

    return (
        <Box>
            <Navbar title="Salas de Aulas" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <Box flex='1' borderRadius={8} bg={useColorModeValue('gray.200', 'gray.800')} p='8'>
                            <Flex mb='8' justify='space-between' align='center'>
                                <Heading size='lg' fontWeight='normal'>
                                    Professores
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

                            <Table colorScheme='linkedin'>
                                <Thead>
                                    <Tr>
                                        <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                            <Checkbox colorScheme='pink' borderColor="gray" />
                                        </Th>

                                        <Th>Professor</Th>

                                        {isWideVersion && <Th>CPF/CNPJ</Th>}

                                        {isWideVersion && <Th>Data de cadastro</Th>}

                                        {isWideVersion && <Th width='8'></Th>}

                                        {isWideVersion && <Th width='8'></Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {fakeTeachers.map((teacher) => {
                                        return (
                                            <Tr key={teacher.idTeacher}>
                                                <Td px={['4', '4', '6']}>
                                                    <Checkbox colorScheme='pink' borderColor="gray" />
                                                </Td>

                                                <Td>
                                                    <Box>
                                                        <Link
                                                            color='purple.400'
                                                        >
                                                            <Text fontWeight='bold'>{teacher.nameTeacher}</Text>
                                                        </Link>
                                                        <Text fontSize='sm' color='gray.400'>{teacher.emailTeacher}</Text>
                                                    </Box>
                                                </Td>

                                                {isWideVersion && <Td>{teacher.cpfOrCnpjTeacher}</Td>}

                                                {isWideVersion && <Td>{teacher.createdAt}</Td>}

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
                                totalCountOfRegisters={fakeTeachers.length}
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