import { Box, Flex, VStack } from "@chakra-ui/react";

import { SidebarActivity } from "./SidebarActivity";
import { SelectCategoriesAcitivity } from "./SelectCategoriesAcitivity";
import { ButtonViewActivity } from "./ButtonViewActivity";

interface ActivityProps {
    isSmallScreen: boolean
}

export function Activity({ isSmallScreen }: ActivityProps) {
    return (
        <Flex
            p={5}
            direction="column"
        >
            <Flex direction="row" pt="1.5rem">
                {!isSmallScreen && <SidebarActivity />}

                <VStack spacing={4} w="full">
                    {isSmallScreen && <SelectCategoriesAcitivity />}

                    <Box mr="auto" ml={-4}>
                        <ButtonViewActivity />
                    </Box>
                </VStack>
            </Flex>
        </Flex>
    );
}