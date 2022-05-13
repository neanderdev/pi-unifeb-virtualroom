import NextLink from "next/link";
import {
    Box,
    Flex,
    Icon,
    IconButton,
    LinkOverlay,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import { CgNotes } from "react-icons/cg";
import { IoEllipsisVertical } from "react-icons/io5";

interface CardActivityProps {
    uid_activity: string;
    nameTeacher: string;
    nameActivity: string
    tipoActivity: string;
    publicDateActivity: string | Date;
    classUid: string;
}

export function CardActivity({ uid_activity, nameTeacher, nameActivity, tipoActivity, publicDateActivity, classUid }: CardActivityProps) {
    return (
        <Box
            w="full"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.100"
            overflow="hidden"
            display="flex"
            alignItems="center"
            _hover={{
                bg: useColorModeValue("gray.100", "gray.800")
            }}
        >
            <NextLink href={`/rooms/${classUid}/${uid_activity}`} passHref>
                <Flex w="full" cursor="pointer">
                    <Box
                        w={12}
                        h={12}
                        bg="gray"
                        rounded="full"
                        my="6px"
                        ml="12px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CgNotes size={24} color="white" />
                    </Box>

                    <VStack ml={8} alignItems="start">
                        <Text>{nameTeacher} Martins postou uma {tipoActivity === "A" ? "atividade" : tipoActivity === "C" ? "chamada" : "material"}: {nameActivity}</Text>
                        <Text>{publicDateActivity}</Text>
                    </VStack>
                </Flex>
            </NextLink>

            <Box ml="auto" mr={4}>
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            aria-label="Opções"
                            rounded="full"
                            bg="transparent"
                            _hover={{
                                bg: "transparent",
                            }}
                            _active={{
                                bg: "transparent",
                            }}
                            icon={<Icon as={IoEllipsisVertical} />}
                        />
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent w={24}>
                            <Text size='lg' m={2} cursor="pointer">
                                <LinkOverlay
                                    onClick={() => alert("Copiar link")}
                                >
                                    Copiar link
                                </LinkOverlay>
                            </Text>
                        </PopoverContent>
                    </Portal>
                </Popover>
            </Box>
        </Box>
    );
}