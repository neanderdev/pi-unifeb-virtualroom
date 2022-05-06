import { useRouter } from "next/router";
import { useState } from "react";
import {
    Box,
    Progress,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useMediaQuery,
} from "@chakra-ui/react";

import { getClassUid } from "../../../services/hooks/useClassUid";

import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { MobileSidebar } from "../../../components/Sidebar/MobileSidebar";
import { Wall } from "../../../components/Wall";
import { Activity } from "../../../components/Activity";
import { Classmates } from "../../../components/Classmates";
import { Can } from "../../../components/Can";

interface ClassUser {
    user: {
        ra_user: number;
        name_user: string;
        email_user: string;
        tipo_user: string;
    };
};

interface ClassResponse {
    uid_class: string;
    name_class: string;
    name_matter_class: string;
    background_class: string;
    isArchive: boolean;
    createdAt_class: Date;
    updatedAt_class: Date;
    ClassUser: ClassUser[];
};

interface RoomIdProps {
    classes: ClassResponse;
};


export default function RoomId({ classes }: RoomIdProps) {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const [classNotice, setClassNotice] = useState("");
    const [classComment, setClassComment] = useState("");

    const { isReady } = useRouter();

    if (!isReady) {
        return (
            <Box w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center" bg="white">
                <Box w="full">
                    <Progress size='xs' isIndeterminate colorScheme="red" />
                </Box>
            </Box>
        );
    }

    return (
        <Box>
            <Navbar
                title={classes.name_matter_class}
                isRoom
                nameClass={classes.name_class}
                nameMatter={classes.name_matter_class}
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

                                        <Can roles="admin">
                                            <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Configuração</Tab>
                                        </Can>
                                    </TabList>
                                </Box>

                                <TabPanels>
                                    <TabPanel>
                                        <Wall
                                            backgroundClass={`http://localhost:8000/files${classes.background_class}`}
                                            nameClass={classes.name_class}
                                            nameMatter={classes.name_matter_class}
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
                                        <Classmates
                                            teachers={classes.ClassUser.filter((classe) => classe.user.tipo_user === "T")}
                                            students={classes.ClassUser.filter((classe) => classe.user.tipo_user === "S")}
                                        />
                                    </TabPanel>

                                    <TabPanel>
                                        <Can roles="admin">
                                            <h1 style={{ color: "black" }}>Editar sala de aula</h1>
                                        </Can>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const uid_class = ctx.params.roomId as string;

    const { classes } = await getClassUid(uid_class, ctx);

    return {
        props: {
            classes,
        }
    };
})