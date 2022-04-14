import { useState } from "react";
import {
    Box,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useMediaQuery,
} from "@chakra-ui/react";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Wall } from "../../components/Wall";
import { Activity } from "../../components/Activity";
import { Classmates } from "../../components/Classmates";

export default function RoomId() {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const [classNotice, setClassNotice] = useState("");
    const [classComment, setClassComment] = useState("");

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
                                        <Activity isSmallScreen={isSmallScreen} />
                                    </TabPanel>

                                    <TabPanel>
                                        <Classmates />
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