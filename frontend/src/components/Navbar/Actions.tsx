import { Box, SlideFade, useColorModeValue, useDisclosure } from "@chakra-ui/react";

import { ActionsList } from "./ActionsList";
import { ActionsButton } from "./ActionsButton";

export function Actions() {
    const { onToggle, isOpen } = useDisclosure();

    return (
        <>
            <ActionsList display={["none", , "flex"]} />

            <ActionsButton onClick={onToggle} isOpen={isOpen} />

            <Box pos="absolute" insetX="5" top="5rem" zIndex={isOpen && "overlay"}>
                <SlideFade in={isOpen} offsetY="90px">
                    <ActionsList
                        p={5}
                        justify="center"
                        rounded="3xl"
                        shadow="lg"
                        layerStyle="neutral"
                        justifyContent="space-between"
                        display={["flex", , "none"]}
                        bg={useColorModeValue("gray.200", "gray.800")}
                    />
                </SlideFade>
            </Box>
        </>
    );
}