import { Box, SimpleGrid, Stack, useMediaQuery } from "@chakra-ui/react";

import { withSSRAuth } from "../../utils/withSSRAuth";

import { setupAPIClient } from "../../services/api";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { ClassCard } from "../../components/ClassCard";

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
                        <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignItems='flex-start'>
                            <ClassCard
                                imageClass="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=100"
                                nameClass="Projeto Integrador"
                                hrefClass="#"
                                nameTeacherClass="Prof. Wendel Cortes"
                                nameStudent="Neander Souza"
                                imageStudent="https://github.com/neanderdev.png"
                            />

                            <ClassCard
                                imageClass="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=100"
                                nameClass="Arquitetura Computacional"
                                hrefClass="#"
                                nameTeacherClass="Prof. Fábio"
                                nameStudent="Neander Souza"
                                imageStudent="https://github.com/neanderdev.png"
                            />

                            <ClassCard
                                imageClass="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=100"
                                nameClass="Programação Orientada a Objetos"
                                hrefClass="#"
                                nameTeacherClass="Prof. Salvitierra Bombadão"
                                nameStudent="Neander Souza"
                                imageStudent="https://github.com/neanderdev.png"
                            />
                        </SimpleGrid>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('me');
    console.log(response.data);

    return {
        props: {}
    };
})