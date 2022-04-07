import { Box, Stack, useMediaQuery } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MobileSidebar } from "../components/Sidebar/MobileSidebar";

export default function Rooms() {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    return (
        <Box>
            <Navbar title="Salas de Aulas" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <h6>Sala de Aulas</h6>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}