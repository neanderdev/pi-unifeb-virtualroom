import { Flex, VStack } from "@chakra-ui/react";
import { SelectCategoriesAcitivity } from "./SelectCategoriesAcitivity";

import { SidebarActivity } from "./SidebarActivity";

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
                </VStack>
            </Flex>
        </Flex>
    );
}