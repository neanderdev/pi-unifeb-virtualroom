import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Spacer,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useBreakpointValue,
    useColorModeValue,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import { CgClose, CgMenu } from "react-icons/cg";

import { Logo } from "../../components/Logo";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Actions } from "../../components/Navbar/Actions";

import { useDrawer } from "../../contexts/DrawerContext";

export default function RoomId() {
    const { onToggle, isOpen } = useDrawer();
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const icon = isOpen ? CgClose : CgMenu;

    return (
        <Box>
            <Flex
                h="4.5rem"
                roundedBottom={[, , "2xl"]}
                alignItems="center"
                p={5}
                bg={useColorModeValue("gray.200", "gray.800")}
            >
                <Stack direction="row" w="full" alignItems="center" spacing={[0, , 8]}>
                    <Logo />

                    {isSmallScreen && <MobileSidebar />}

                    <IconButton
                        color={useColorModeValue("gray.900", "white")}
                        variant="ghost"
                        fontSize="2xl"
                        aria-label="Toggle Actions"
                        icon={<Icon as={icon} />}
                        transition="all .4s ease-in-out"
                        onClick={onToggle}
                    />

                    <Spacer display={{ md: "none" }} />

                    {/* <Text
                        textStyle="default"
                        fontSize="lg"
                        fontWeight="semibold"
                    >
                        Programação Orientada a Objeto

                        <Text
                            textStyle="default"
                            fontSize="sm"
                            fontWeight="normal"
                        >
                            SIN.3.TU - 2022/1
                        </Text>
                    </Text> */}

                    <Flex direction="column">
                        <h1>
                            Programação Orientada a Objeto
                        </h1>

                        <span>SIN.3.TU - 2022/1</span>
                    </Flex>

                    <Spacer />

                    <Actions />
                </Stack>
            </Flex>

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar isCollapseSidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <Box
                            h="3rem"
                        >
                            <Tabs isFitted>
                                <Box w="full" display="flex" justifyContent="center">
                                    <TabList>
                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Mural</Tab>

                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Atividades</Tab>

                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Pessoas</Tab>
                                    </TabList>
                                </Box>

                                <TabPanels>
                                    <TabPanel>
                                        <Flex
                                            p={5}
                                            direction="column"
                                        >
                                            <Flex
                                                w="full"
                                                h="240px"
                                                backgroundImage="url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=100)"
                                                backgroundSize="cover"
                                                backgroundPosition="center"
                                                rounded="xl"
                                            >
                                                <VStack
                                                    w="full"
                                                    p="24px"
                                                    justify="end"
                                                    align="start"
                                                    px={useBreakpointValue({ base: 12, md: 8 })}
                                                >
                                                    <Stack
                                                        maxW="2xl"
                                                        align="flex-start"
                                                        spacing={6}
                                                    >
                                                        {/* <Text
                                                            color="white"
                                                            textStyle="default"
                                                            fontSize="3xl"
                                                            fontWeight="bold"
                                                        >
                                                            Programação Orientada a Objeto

                                                            <Text
                                                                textStyle="default"
                                                                fontSize="xl"
                                                                fontWeight="normal"
                                                            >
                                                                SIN.3.TU - 2022/1
                                                            </Text>
                                                        </Text> */}

                                                        <h1 style={{ color: "white" }}>
                                                            Programação Orientada a Objeto
                                                        </h1>

                                                        <span style={{ color: "white" }}>SIN.3.TU - 2022/1</span>
                                                    </Stack>
                                                </VStack>
                                            </Flex>

                                            <Flex direction="row" pt="1.5rem">
                                                {!isSmallScreen && (
                                                    <Box
                                                        w={240}
                                                        h={180}
                                                        maxH="full"
                                                        rounded="md"
                                                        borderWidth="1px"
                                                        borderColor="gray.100"
                                                    >
                                                        <Flex direction="column">
                                                            <span>Próximas atividades</span>

                                                            <span>Nenhuma atividade para a próxima semana!</span>

                                                            <Button colorScheme='teal' variant='link'>
                                                                Ver tudo
                                                            </Button>
                                                        </Flex>
                                                    </Box>
                                                )}
                                            </Flex>
                                        </Flex>
                                    </TabPanel>

                                    <TabPanel>
                                        <Flex
                                            h="3xl"
                                            p={5}
                                            bg={useColorModeValue("gray.200", "gray.800")}
                                        >
                                            <p>Atividades</p>
                                        </Flex>
                                    </TabPanel>

                                    <TabPanel>
                                        <Flex
                                            h="3xl"
                                            p={5}
                                            bg={useColorModeValue("gray.200", "gray.800")}
                                        >
                                            <p>Pessoas</p>
                                        </Flex>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>

                    </Box>
                </Stack>
            </Box >
        </Box >
    );
}