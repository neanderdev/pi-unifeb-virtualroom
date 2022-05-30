import { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, Checkbox, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "react-query";

import { useFindClassUserByUid } from "../../services/hooks/useFindClassUserByUid";

import { setupAPIClient } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { useModal } from "../../contexts/ModalContext";

import { Pagination } from "../Pagination";

interface User {
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
    dt_nascimento_user: Date | string;
    dt_matricula_user: Date | string;
    situacao_user: boolean;
    senha: string;
    tipo_user: string;
    roles: string;
    checked?: boolean;
};

interface ModalAddUserProps {
    class_uid: string;
    isWideVersion: boolean;
    isLoadingUsers: boolean;
    isFetchingUsers: boolean;
    errorUsers: any;
    users: User[];
    totalCount: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
};

interface UserToClass {
    user_uid: string;
    class_uid: string;
};

export function ModalAddUser({
    class_uid,
    isWideVersion,
    isLoadingUsers,
    isFetchingUsers,
    errorUsers,
    users,
    totalCount,
    page,
    setPage,
}: ModalAddUserProps) {
    const { isOpen, onClose } = useModal();
    const toast = useToast();

    const { data } = useFindClassUserByUid(class_uid);

    const arrVerifyClassUser = users?.filter((user) => {
        return data?.filter((classUser) => {
            if (user.uid_user === classUser.user_uid) {
                user.checked = true;
            }

            return {
                ...user,
            };
        });
    });

    const [usersArr, setUsersArr] = useState(users ?? []);

    const allChecked = usersArr?.every(user => user.checked);
    const isIndeterminate = usersArr?.some(user => user.checked) && !allChecked;

    const addUserToClass = useMutation(async (addUserToClass: UserToClass) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post('add-user-to-class', addUserToClass);

        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('classUid');
            queryClient.invalidateQueries('classUser');
        }
    });

    const handleAddUserToClass = async () => {
        try {
            const isUserChecked = usersArr?.filter((user) => user.checked === true);

            if (isUserChecked?.length > 0) {
                const userToClass = isUserChecked.map((user) => {
                    return {
                        user_uid: user.uid_user,
                        class_uid,
                    };
                }) as UserToClass[];

                userToClass.map(async (userToClass) => {
                    try {
                        await addUserToClass.mutateAsync({
                            user_uid: userToClass.user_uid,
                            class_uid: userToClass.class_uid,
                        });

                        toast({
                            title: 'Usuário adicionado a turma',
                            description: "Usuário adicionado a turma com sucesso",
                            status: 'success',
                            duration: 1500,
                            isClosable: true,
                        });
                    } catch (error) {
                        console.log(error);

                        toast({
                            title: 'Erro ao adicionar usuário a turma',
                            description: `Erro: ${error.response?.data?.message}`,
                            status: 'error',
                            duration: 1500,
                            isClosable: true,
                        });

                        return;
                    }
                });

                onClose();
            } else {
                toast({
                    title: 'Usuários vazios',
                    description: "Nenhum usuário selecionado",
                    status: 'warning',
                    duration: 1500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);

            toast({
                title: 'Erro ao adicionar usuário a turma',
                description: `Erro: ${error.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
            size="2xl"
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Adicionar Professor e Aluno a esta turma</ModalHeader>

                <ModalCloseButton />

                <ModalBody>
                    <Box
                        flex='1'
                        borderRadius={8}
                        p={['6', '8']}
                    >
                        <VStack spacing='8'>
                            {isLoadingUsers ? (
                                <Flex justify='center' align="center">
                                    <Spinner size="xl" color='gray.500' ml='4' />
                                </Flex>
                            ) : isFetchingUsers ? (
                                <Flex justify='center' align="center">
                                    <Spinner size="xl" color='gray.500' ml='4' />
                                </Flex>
                            ) : errorUsers ? (
                                <Flex justify='center'>
                                    <Text>Falha ao obter dados da turmas.</Text>
                                </Flex>
                            ) : (
                                <>
                                    <Table variant='striped' colorScheme='linkedin'>
                                        <Thead>
                                            <Tr>
                                                <Th>
                                                    <Checkbox
                                                        colorScheme='pink'
                                                        isChecked={allChecked}
                                                        isIndeterminate={isIndeterminate}
                                                        onChange={(e) => {
                                                            const isVerifyAllCheckedUsers = users?.map((user) => {
                                                                return {
                                                                    ...user,
                                                                    checked: e.target.checked,
                                                                };
                                                            });

                                                            setUsersArr(isVerifyAllCheckedUsers);
                                                        }}
                                                    />
                                                </Th>

                                                {isWideVersion && <Th>Nome</Th>}

                                                <Th isNumeric>RA</Th>
                                            </Tr>
                                        </Thead>

                                        <Tbody>
                                            {usersArr?.map((user, index) => (
                                                <Tr key={index}>
                                                    <Td>
                                                        <Checkbox
                                                            colorScheme='pink'
                                                            isChecked={user.checked}
                                                            onChange={(e) => {
                                                                const isVerifyCheckedUser = usersArr?.map((user, i) => {
                                                                    if (i === index) {
                                                                        user.checked = e.target.checked;
                                                                    }

                                                                    return {
                                                                        ...user
                                                                    };
                                                                });

                                                                setUsersArr(isVerifyCheckedUser);
                                                            }}
                                                        />
                                                    </Td>

                                                    {isWideVersion && <Td isTruncated>{user.name_user}</Td>}

                                                    <Td isNumeric>{user.ra_user}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>

                                    <Pagination
                                        totalCountOfRegisters={totalCount}
                                        totalCountOfRegistersNow={usersArr.length}
                                        currentPage={page}
                                        onPageChange={setPage}
                                    />
                                </>
                            )}
                        </VStack>

                        <HStack mt={4} alignItems="center" justifyContent="flex-end">
                            <Button type='submit' colorScheme='pink' mr={3} onClick={handleAddUserToClass}>
                                Salvar
                            </Button>

                            <Button variant='ghost' onClick={onClose}>Fechar</Button>
                        </HStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal >
    );
}