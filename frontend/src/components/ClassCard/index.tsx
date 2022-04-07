import NextLink from "next/link";
import { Avatar, Box, Flex, Heading, Stack, Text, Image, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";

interface ClassCardProps {
    imageClass: string;
    hrefClass: string;
    nameClass: string;
    nameTeacherClass: string;
    nameStudent: string;
    imageStudent: string;
}

export function ClassCard({ imageClass, hrefClass, nameClass, nameTeacherClass, nameStudent, imageStudent }: ClassCardProps) {
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

                <Stack p={6}>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize="2xl"
                        fontFamily="body"
                    >
                        {nameClass}
                    </Heading>

                    <Text color="gray.500">
                        {nameTeacherClass}
                    </Text>
                </Stack>

                <Stack pl={4} pt={-2} pb={4}>
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
                </Stack>
            </Box>
        </NextLink>
    );
}