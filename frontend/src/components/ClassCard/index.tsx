import NextLink from "next/link";
import { Dispatch, memo, SetStateAction } from "react";
import { Avatar, Box, Flex, Heading, Stack, Text, Image, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import { useModal } from "../../contexts/ModalContext";

interface ClassCardProps {
    classUid: string;
    imageClass: string;
    hrefClass: string;
    nameClass: string;
    nameTeacherClass: string;
    nameStudent: string;
    imageStudent: string;
    setClassUidSelectedIsModal: Dispatch<SetStateAction<string>>;
}

function ClassCardComponent({ classUid, imageClass, hrefClass, nameClass, nameTeacherClass, nameStudent, imageStudent, setClassUidSelectedIsModal }: ClassCardProps) {
    const { onOpen } = useModal();

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
                </Stack>
            </Box>
        </NextLink>
    );
}

export const ClassCard = memo(ClassCardComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
});