import { useRouter } from "next/router";
import { Box, Icon, IconButton, LinkOverlay, Popover, PopoverContent, PopoverTrigger, Portal, Text, useColorModeValue } from "@chakra-ui/react";
import { IoAddSharp, IoEllipsisVertical } from "react-icons/io5";

interface BoxHeaderActivityProps {
    idCategory: number;
    title: string;
    tipoActivity: string;
}

export function BoxHeaderActivity({ idCategory, title, tipoActivity }: BoxHeaderActivityProps) {
    const router = useRouter();

    return (
        <Box
            id="id-tde-01"
            w="full"
            borderBottomWidth="1px"
            borderBottomColor="gray.500"
            cursor="pointer"
            _hover={{
                borderBottomWidth: "0",
                bg: useColorModeValue("gray.100", "gray.700"),
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="lg"
            borderBottomRadius="0"
        >
            <Text
                fontSize="2xl"
                fontWeight="semibold"
                ml={4}
                isTruncated
            >
                {title}
            </Text>

            <Box ml="auto" mr={4}>
                <IconButton
                    aria-label="Adicionar nova atividade"
                    rounded="full"
                    bg="transparent"
                    _hover={{
                        bg: "transparent",
                    }}
                    _active={{
                        bg: "transparent",
                    }}
                    icon={<Icon as={IoAddSharp} fontSize={24} />}
                    onClick={() => router.push(`${router.asPath}/${tipoActivity}/${idCategory}`)}
                />

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