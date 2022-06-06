import { useRouter } from "next/router";
import { Box, Icon, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";

import { Can } from "../Can";

interface BoxHeaderActivityProps {
    idCategory: number;
    title: string;
    tipoActivity: string;
}

export function BoxHeaderActivity({ idCategory, title, tipoActivity }: BoxHeaderActivityProps) {
    const router = useRouter();

    return (
        <Box
            id={idCategory.toString()}
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
                <Can roles={["admin", "teacher"]}>
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
                        onClick={() => router.push(`${router.asPath.split("#")[0]}/${tipoActivity}/${idCategory}`)}
                    />
                </Can>
            </Box>
        </Box >
    );
}