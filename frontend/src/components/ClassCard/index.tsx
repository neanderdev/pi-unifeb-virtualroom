import NextLink from "next/link";
import { Dispatch, memo, SetStateAction } from "react";
import { Avatar, Box, Flex, Heading, Stack, Text, Image, useColorModeValue, IconButton, useToast } from "@chakra-ui/react";
import { FaRegCopy, FaTasks } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { useMutation } from "react-query";

import { useModal } from "../../contexts/ModalContext";

import { setupAPIClient } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { Can } from "../Can";

interface ClassCardProps {
    classUid: string;
    imageClass: string;
    hrefClass: string;
    nameClass: string;
    nameTeacherClass: string;
    nameStudent: string;
    imageStudent: string;
    setClassUidSelectedIsModal?: Dispatch<SetStateAction<string>>;
    isArchiveClass?: boolean;
};

interface ArchiveClass {
    class_uid: string;
}

function ClassCardComponent({ classUid, imageClass, hrefClass, nameClass, nameTeacherClass, nameStudent, imageStudent, setClassUidSelectedIsModal, isArchiveClass = false }: ClassCardProps) {
    const { onOpen } = useModal();
    const toast = useToast();

    const archiveClass = useMutation(async ({ class_uid }: ArchiveClass) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.patch(`class/${class_uid}`);

        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('class')
        }
    });

    const handleArchiveClass = async (class_uid: string) => {
        try {
            if (window.confirm(`Você realmente deseja ${!isArchiveClass ? "arquivar" : "desarquivar"} esta turma?`)) {
                await archiveClass.mutateAsync({ class_uid });

                toast({
                    title: 'Turma arquivada',
                    description: "Turma arquivada com sucesso",
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);

            toast({
                title: 'Erro ao arquivar a turma',
                description: `Erro: ${error.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <NextLink href={hrefClass} passHref>
            <Box
                maxW="445px"
                w={'full'}
                bg={useColorModeValue("gray.200", "gray.800")}
                boxShadow="2xl"
                rounded="md"
                overflow="hidden"
                cursor="pointer"
            >
                <Image
                    h="120px"
                    w="full"
                    src={imageClass}
                    objectFit="cover"
                    alt={nameClass}
                />
                <Flex justify="center" mt={-12}>
                    <Avatar
                        size="xl"
                        src={imageStudent}
                        name={nameStudent}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Stack px={6} pt={2} align="center">
                    <Text color="gray.500">
                        {nameStudent}
                    </Text>
                </Stack>

                <Stack p={6}>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize="2xl"
                        fontFamily="body"
                        isTruncated
                    >
                        {nameClass}
                    </Heading>

                    <Text color="gray.500" isTruncated>
                        {nameTeacherClass}
                    </Text>
                </Stack>

                <Stack pl={4} pt={-2} pb={4} direction="row">
                    <IconButton
                        color="pink.500"
                        colorScheme="transparent"
                        aria-label="Copiar link da sala de aula"
                        boxSize="15px"
                        _focus={{ shadow: "none" }}
                        icon={
                            <FaRegCopy size={24} />
                        }
                        onClick={(e) => {
                            e.preventDefault();

                            navigator.clipboard.writeText(`http://localhost:3000/rooms/${classUid}`);

                            alert("Link da sala de aula copiado para área de transferência");
                        }}
                        title="Copiar link da sala de aula"
                    />

                    <IconButton
                        color="pink.500"
                        colorScheme="transparent"
                        aria-label="Ver tarefas desta sala de aula"
                        boxSize="15px"
                        _focus={{ shadow: "none" }}
                        icon={
                            <FaTasks size={24} />
                        }
                        onClick={(e) => {
                            e.preventDefault();

                            alert(nameClass);
                        }}
                        title="Ver tarefas desta sala de aula"
                    />

                    {!isArchiveClass && (
                        <Can roles={["admin"]}>
                            <IconButton
                                color="pink.500"
                                colorScheme="transparent"
                                aria-label="Adicionar usuário a esta turma"
                                boxSize="15px"
                                _focus={{ shadow: "none" }}
                                icon={
                                    <IoMdAdd size={28} />
                                }
                                onClick={(e) => {
                                    e.preventDefault();

                                    setClassUidSelectedIsModal(classUid);

                                    onOpen();
                                }}
                                title="Adicionar usuário a esta turma"
                            />
                        </Can>
                    )}

                    <Can roles={["admin"]}>
                        <IconButton
                            color="pink.500"
                            colorScheme="transparent"
                            aria-label={!isArchiveClass ? "Arquivar esta turma" : "Desarquivar esta turma"}
                            boxSize="15px"
                            _focus={{ shadow: "none" }}
                            icon={
                                isArchiveClass ? <BiArchiveOut size={28} /> : <BiArchiveIn size={28} />
                            }
                            onClick={(e) => {
                                e.preventDefault();

                                handleArchiveClass(classUid);
                            }}
                            title={!isArchiveClass ? "Arquivar esta turma" : "Desarquivar esta turma"}
                        />
                    </Can>
                </Stack>
            </Box>
        </NextLink>
    );
}

export const ClassCard = memo(ClassCardComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
});