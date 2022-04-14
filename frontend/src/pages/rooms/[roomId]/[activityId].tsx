import { Box, SimpleGrid, Stack, Text, useMediaQuery } from "@chakra-ui/react";

import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { MobileSidebar } from "../../../components/Sidebar/MobileSidebar";

export default function ActivityId() {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    return (
        <Box>
            <Navbar
                title="Programação Orientada a Objeto"
                isRoom
                nameClass="SIN.3.TU - 2022/1"
                nameMatter="Programação Orientada a Objeto"
            />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar isCollapseSidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <Box
                            h="3rem"
                        >
                            <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
                                <Box
                                    w="full"
                                    borderWidth="1px"
                                    borderColor="gray.300"
                                    borderStyle="dashed"
                                >
                                    <Text>Title da atividade</Text>
                                    <Text>Nome professor</Text>
                                    <Text>Data da Atividade</Text>
                                    <Text>Comentários da atividade 1</Text>
                                    <Text>Comentários da atividade 2</Text>
                                    <Text>Comentários da atividade 3</Text>
                                    <Text>Comentários da atividade 4</Text>
                                    <Text>Input para comentários</Text>
                                </Box>

                                <Stack direction="column" spacing={4}>
                                    <Box
                                        w="full"
                                        borderWidth="1px"
                                        borderColor="gray.300"
                                        borderStyle="dashed"
                                    >
                                        <Text>Box para envios da atividade</Text>
                                    </Box>

                                    <Box
                                        w="full"
                                        borderWidth="1px"
                                        borderColor="gray.300"
                                        borderStyle="dashed"
                                    >
                                        <Text>Comentários particulares para o professor</Text>
                                    </Box>
                                </Stack>
                            </SimpleGrid>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}