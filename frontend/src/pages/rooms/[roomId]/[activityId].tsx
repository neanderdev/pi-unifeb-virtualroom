import { useState } from "react";
import { Box, Stack, useMediaQuery } from "@chakra-ui/react";

import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { MobileSidebar } from "../../../components/Sidebar/MobileSidebar";
import { DetailActivity } from "../../../components/DetailActivity";

export default function ActivityId() {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const [commentPrivate, setCommentPrivate] = useState("");

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
                            <DetailActivity
                                avatarPrivateComment="https://github.com/neanderdev.png"
                                namePrivateComment="Neander de Souza"
                                commentPrivate={commentPrivate}
                                setCommentPrivate={setCommentPrivate}
                            />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}