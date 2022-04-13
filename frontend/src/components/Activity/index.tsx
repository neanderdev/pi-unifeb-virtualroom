import { Flex } from "@chakra-ui/react";

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
            </Flex>
        </Flex>
    );
}