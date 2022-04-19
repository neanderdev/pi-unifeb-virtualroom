import { Box, Divider, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { CgNotes } from "react-icons/cg";

export function CardDetailActivity() {
    return (
        <Box
            w="full"
        >
            <Flex alignItems="center">
                <Box
                    w={10}
                    h={10}
                    bg="gray"
                    rounded="full"
                    my="6px"
                    ml="12px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CgNotes size={22} color="white" />
                </Box>

                <Box mx="2">
                    <Text
                        fontWeight="semibold"
                        fontSize="lg"
                    >
                        Chamada 18/04
                    </Text>

                    <Text
                        fontWeight="normal"
                        fontSize="sm"
                    >
                        Wendel Cortes • 18/04/2022 • Editado às 18/04/2022
                    </Text>
                </Box>
            </Flex>

            <Box display="flex" justifyContent="end" mr={2}>
                <Text
                    fontWeight="normal"
                    fontSize="md"
                >
                    Data de entrega: 18/04/2022
                </Text>
            </Box>

            <Divider />

            <SimpleGrid
                flex="1"
                my="6px"
                ml="12px"
                minChildWidth="140px"
                alignItems="flex-start"
            >
                <Link
                    href="#"
                    target="_blank"
                    color="gray.500"
                >
                    Formulários Google
                </Link>
            </SimpleGrid>
        </Box>
    );
}