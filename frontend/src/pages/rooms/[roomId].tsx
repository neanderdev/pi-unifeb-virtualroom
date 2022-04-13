import NextLink from "next/link";
import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    IconButton,
    Input,
    LinkOverlay,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Select,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    useBreakpointValue,
    useColorModeValue,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import { CgClose, CgMenu, CgNotes } from "react-icons/cg";
import { IoEllipsisVertical } from "react-icons/io5";
import { BiSend } from "react-icons/bi";
import { AiOutlineContacts } from "react-icons/ai";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Wall } from "../../components/Wall";

import { useDrawer } from "../../contexts/DrawerContext";

export default function RoomId() {
    const { onToggle, isOpen } = useDrawer();
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const [classNotice, setClassNotice] = useState("");
    const [classComment, setClassComment] = useState("");

    const icon = isOpen ? CgClose : CgMenu;

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
                            <Tabs isFitted isLazy defaultIndex={0}>
                                <Box w="full" display="flex" justifyContent="center">
                                    <TabList>
                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Mural</Tab>

                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Atividades</Tab>

                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Pessoas</Tab>
                                    </TabList>
                                </Box>

                                <TabPanels>
                                    <TabPanel>
                                        <Wall
                                            nameClass="SIN.3.TU - 2022/1"
                                            nameMatter="Programação Orientada a Objeto"
                                            classNotice={classNotice}
                                            setClassNotice={setClassNotice}
                                            avatarTeacher=""
                                            nameTeacher="Wendel Cortes"
                                            publicDateComment="12 de abril de 2020"
                                            avatarStudent="https://github.com/neanderdev.png"
                                            nameStudent="Neander de Souza"
                                            classComment={classComment}
                                            setClassComment={setClassComment}
                                        />
                                    </TabPanel>

                                    <TabPanel>
                                        Atividades
                                    </TabPanel>

                                    <TabPanel>
                                        Pessoas
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