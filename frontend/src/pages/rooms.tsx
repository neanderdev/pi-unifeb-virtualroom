import { Box, Stack } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export default function Rooms() {
    return (
        <Box>
            <Navbar title="Salas de Aulas" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar />
                </Stack>
            </Box>
        </Box>
    );
}